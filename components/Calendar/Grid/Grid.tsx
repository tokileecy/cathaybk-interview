import React, { useMemo } from 'react'
import { GridStatus } from './useGrid'
import { pos2DToId } from '../utils'
import * as styles from './Grid.styles'
import GridProvider from './GridProvider'

export interface GridFieldCompProps {
  /**
   * x Axis value in Grid Cordinater, x start from 0.
   */
  x: number
  /**
   * y Axis value in Grid Cordinater, y start from 0.
   */
  y: number
}

export type GridFieldComp = (props: GridFieldCompProps) => JSX.Element

export interface GridProps {
  grid: GridStatus
  onFieldClick?: (x: number, y: number) => void
  fieldSize?: 'small' | 'large'
  GridField: GridFieldComp
}

export default function Grid(props: GridProps) {
  const { grid, onFieldClick, GridField } = props

  const rows = useMemo(() => {
    return Array(grid.maxRow)
      .fill(1)
      .map((_value, y) => (
        <div key={y} className={styles.dateRow}>
          {Array(grid.maxColumn)
            .fill(1)
            .map((_value, x) => {
              return <GridField key={pos2DToId(x, y)} y={y} x={x} />
            })}
        </div>
      ))
  }, [grid.maxRow, grid.maxColumn])

  return (
    <GridProvider value={{ grid, onDateClick: onFieldClick }}>
      {rows}
    </GridProvider>
  )
}
