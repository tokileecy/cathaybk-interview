import React, { MouseEventHandler } from 'react'
import { cx } from '@emotion/css'
import * as styles from './BaseDayButton.styles'

export interface BaseDayButtonProps {
  children?: string | number
  disableClick?: boolean
  active?: boolean
  nonCurrentMonth?: boolean
  isToday?: boolean
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
