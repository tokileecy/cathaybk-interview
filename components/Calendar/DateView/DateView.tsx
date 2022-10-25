import React, { useEffect, useMemo } from 'react'
import * as styles from './DateView.styles'
import Grid from '../Grid'
import useGrid, { GetFieldDatas } from '../Grid/useGrid'
import {
  getDateFromDateViewByMatrixPos,
  DateMatrix,
  dateToDateViewMatrix,
  today,
} from '../utils'
import Header from '../Header'
import GridDayButton from '../GridDayButton'

const maxRow = 6
const maxColumn = 7

export interface DateViewProps {
  disableNonCurrentMonthDayClick?: boolean
  viewMonth?: number
  viewYear?: number
  startDate: Date | null
  endDate: Date | null
  onSelect?: (date: Date) => void
  onLeftClick?: () => void
  onRightClick?: () => void
}

export default function DateView(props: DateViewProps) {
  const {
    disableNonCurrentMonthDayClick = false,
    viewMonth = today.getMonth() + 1,
    viewYear = today.getFullYear(),
    startDate,
    endDate,
    onSelect,
    onLeftClick,
    onRightClick,
  } = props

  const beginTimeOfStartDate = useMemo(() => {
    let target = null

    if (startDate !== null) {
      target = new Date(startDate)
      target.setHours(0, 0, 0, 0)
    }

    return target
  }, [startDate])

  const endTimeOfEndDate = useMemo(() => {
    let target = null

    if (endDate !== null) {
      target = new Date(endDate)
      target.setHours(23, 59, 59, 999)
    }

    return target
  }, [endDate])

  const calendarMatrix = useMemo(() => {
    const firstDayDateOfMonth = new Date(viewYear, viewMonth - 1, 1, 0, 0, 0, 0)

    return dateToDateViewMatrix(firstDayDateOfMonth, maxRow, maxColumn)
  }, [viewMonth, viewYear])

  const getFieldDatas: GetFieldDatas<Date> = (
    matrix: DateMatrix,
    x: number,
    y: number
  ) => {
    const fieldDate = matrix.getDayPos(x, y)

    let isSelected = false

    if (beginTimeOfStartDate === null) {
      isSelected = false
    } else if (endTimeOfEndDate === null) {
      isSelected =
        fieldDate.getFullYear() === beginTimeOfStartDate?.getFullYear() &&
        fieldDate.getMonth() === beginTimeOfStartDate?.getMonth() &&
        fieldDate.getDate() === beginTimeOfStartDate.getDate()
    } else if (beginTimeOfStartDate !== null && endTimeOfEndDate !== null) {
      isSelected =
        fieldDate >= beginTimeOfStartDate && fieldDate <= endTimeOfEndDate
    }

    const isToday = Number(fieldDate) === Number(today)

    const nonCurrentMonth =
      fieldDate.getFullYear() !== viewYear ||
      fieldDate.getMonth() + 1 !== viewMonth

    return {
      isSelected,
      isToday,
      nonCurrentMonth,
      disableClick: disableNonCurrentMonthDayClick && nonCurrentMonth,
      date: fieldDate,
    }
  }

  const { grid, refresh } = useGrid<Date>({
    maxRow,
    maxColumn,
    calendarMatrix,
    startDate,
    endDate,
    getFieldDatas,
  })

  const headerContent = ` ${viewYear}年${viewMonth}月`

  const handleFieldClick = (x: number, y: number) => {
    const selectedDate = getDateFromDateViewByMatrixPos(
      viewYear,
      viewMonth,
      x,
      y
    )

    const targetDate = new Date(selectedDate)

    targetDate.setHours(0, 0, 0, 0)
    onSelect?.(targetDate)
  }

  useEffect(() => {
    refresh()
  }, [calendarMatrix, startDate, endDate, disableNonCurrentMonthDayClick])

  return (
    <>
      <Header onLeftClick={onLeftClick} onRightClick={onRightClick}>
        {headerContent}
      </Header>
      <div className={styles.days}>
        <Grid
          grid={grid}
          onFieldClick={handleFieldClick}
          GridField={GridDayButton}
        />
      </div>
    </>
  )
}
