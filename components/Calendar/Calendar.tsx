import React from 'react'
import { css } from '@emotion/css'
import { today } from './utils'
import DateView from './DateView'

export const cssRoot = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '16px',
  width: '350px',
  height: '240px',
})

export type ViewStatus = 'date' | 'month' | 'year'

export interface CalendarProps {
  /** Disable Non Current Month Day Button Click Event. */
  disableNonCurrentMonthDayClick?: boolean
  /** Calendar Current View Month */
  viewMonth?: number
  /** Calendar Current View Year */
  viewYear?: number
  /** Calendar selected start date */
  startDate?: Date | null
  /** Calendar selected end date */
  endDate?: Date | null
  /** Called when a date is selected */
  onSelect?: (date: Date) => void
  /** Called when left arrow is clicked. */
  onLeftClick?: () => void
  /** Called when right arrow is clicked. */
  onRightClick?: () => void
}

export default function Calendar(props: CalendarProps) {
  const {
    disableNonCurrentMonthDayClick,
    viewMonth,
    viewYear,
    startDate = null,
    endDate = null,
    onSelect,
    onLeftClick,
    onRightClick,
  } = props

  const handleSelect = (date: Date) => {
    onSelect?.(date)
  }

  let targetMonth = viewMonth

  if (targetMonth !== undefined && targetMonth < 1 && targetMonth > 12) {
    console.error('month shoud belong 1 - 12')
    targetMonth = today.getMonth() + 1
  }

  return (
    <div className={cssRoot}>
      <DateView
        disableNonCurrentMonthDayClick={disableNonCurrentMonthDayClick}
        viewMonth={targetMonth}
        viewYear={viewYear}
        startDate={startDate}
        endDate={endDate}
        onSelect={handleSelect}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
    </div>
  )
}
