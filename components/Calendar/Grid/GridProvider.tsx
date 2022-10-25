import { createContext, ReactNode } from 'react'
import { GridStatus } from './useGrid'

interface GridContextValue {
  grid: GridStatus
  onDateClick?: (x: number, y: number) => void
}

export const GridContext = createContext<GridContextValue>({
  grid: {
    maxRow: 1,
    maxColumn: 1,
    fieldStates: {},
  },
  onDateClick: undefined,
})
export interface GridProviderProps {
  children?: ReactNode
  value: GridContextValue
}

export default function GridProvider(props: GridProviderProps) {
  const { value, children } = props

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>
}
