import React, { MouseEventHandler } from 'react'
import { cx } from '@emotion/css'
import * as styles from './BaseDayButton.styles'

export interface BaseDayButtonProps {
  children?: string | number
  /**
   * Disalbe Click Event
   */
  disableClick?: boolean
  /**
   * Display Active Styles
   */
  active?: boolean
  /**
   * Display Non Current Month Styles
   */
  nonCurrentMonth?: boolean
  /**
   * Display isToday Styles
   */
  isToday?: boolean
  /**
   * Call when Day Button Click
   */
  onClick?: MouseEventHandler<HTMLDivElement>
}

export default function BaseDayButton(props: BaseDayButtonProps) {
  const {
    isToday = false,
    disableClick = false,
    nonCurrentMonth = false,
    active = false,
    children = '',
    onClick,
  } = props

  return (
    <div
      data-testid="calendar-base-day-button"
      className={cx(styles.root, {
        active,
        'is-today': isToday,
        'non-current-month': nonCurrentMonth,
        'disable-click': disableClick,
      })}
      onClick={(e) => {
        if (!disableClick) {
          onClick?.(e)
        }
      }}
    >
      {children}
    </div>
  )
}
