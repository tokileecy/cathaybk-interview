import React, { useContext, useMemo } from 'react'
import { pos2DToId } from './utils'
import BaseDayButton from './BaseDayButton'
import { GridFieldCompProps } from './Grid/Grid'
import { GridContext } from './Grid/GridProvider'

export type GridDayButtonProps = GridFieldCompProps

export default function GridDayButton(props: GridDayButtonProps) {
  const { y, x } = props

  const { grid, onDateClick } = useContext(GridContext)
  const fieldState = grid.fieldStates[pos2DToId(x, y)]

  return useMemo(
    () => (
      <BaseDayButton
        active={fieldState.isSelected}
        isToday={fieldState.isToday}
        nonCurrentMonth={fieldState.nonCurrentMonth}
        disableClick={fieldState.disableClick}
        onClick={() => {
          onDateClick?.(x, y)
        }}
      >
        {grid.fieldStates[pos2DToId(x, y)].date.getDate()}
      </BaseDayButton>
    ),
    [fieldState]
  )
}
