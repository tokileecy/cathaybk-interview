import { useMemo, useReducer } from 'react'
import { CalendarMatrix, pos2DToId } from '../utils'

export interface FieldState {
  date: Date
  isSelected?: boolean
  isToday?: boolean
  nonCurrentMonth?: boolean
  disableClick?: boolean
}

export interface GridStatus {
  maxRow: number
  maxColumn: number
  fieldStates: Record<string, FieldState>
}

const instanceOfActionFunc = <T>(object: any): object is (prev: T) => T => {
  if (typeof object === 'function') {
    return true
  }

  return false
}

export type SetGridStatusAction =
  | Partial<GridStatus>
  | ((S: GridStatus) => Partial<GridStatus>)

export type GetFieldDatas<T> = (
  matrix: CalendarMatrix<T>,
  x: number,
  y: number
) => {
  isSelected: boolean
  isToday: boolean
  nonCurrentMonth: boolean
  disableClick?: boolean
}

export interface UseGridOptions<T extends object> {
  maxRow: number
  maxColumn: number
  calendarMatrix: CalendarMatrix<T>
  startDate: Date | null
  endDate: Date | null
  getFieldDatas: GetFieldDatas<T>
}

export default function useGrid<T extends object>(options: UseGridOptions<T>) {
  const { maxRow, maxColumn, calendarMatrix, getFieldDatas } = options

  const initfieldStates = useMemo<Record<string, FieldState>>(() => {
    const target: Record<string, FieldState> = {}

    for (let y = 0; y < maxRow; y++) {
      for (let x = 0; x < maxColumn; x++) {
        target[pos2DToId(x, y)] = {
          date: new Date(),
          isSelected: false,
        }
      }
    }

    return target
  }, [maxRow, maxColumn])

  const [grid, setGrid] = useReducer(
    (prev: GridStatus, value: SetGridStatusAction) => {
      let next: GridStatus

      if (instanceOfActionFunc<GridStatus>(value)) {
        next = value(prev)
      } else {
        next = value as GridStatus
      }

      return {
        ...prev,
        ...next,
      }
    },
    {
      maxRow,
      maxColumn,
      fieldStates: initfieldStates,
    }
  )

  const refresh = () => {
    setGrid((prev) => {
      const next = { ...prev }

      next.fieldStates = { ...next.fieldStates }

      for (let y = 0; y < prev.maxRow; y++) {
        for (let x = 0; x < prev.maxColumn; x++) {
          const fieldDatas = getFieldDatas(calendarMatrix, x, y)

          const nextFieldState = {
            ...next.fieldStates[pos2DToId(x, y)],
            ...fieldDatas,
          }

          next.fieldStates[pos2DToId(x, y)] = nextFieldState
        }
      }

      return next
    })
  }

  return { grid, setGrid, refresh }
}
