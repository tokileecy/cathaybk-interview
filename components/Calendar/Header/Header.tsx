import React, { ReactNode } from 'react'
import { cx } from '@emotion/css'
import * as styles from './Header.styles'

export interface HeaderProps {
  children?: ReactNode
  /**
   * Call when left arrow clicked
   * @returns
   */
  onLeftClick?: () => void
  /**
   * Call when right arrow clicked
   * @returns
   */
  onRightClick?: () => void
}

export default function Header(props: HeaderProps) {
  const { children, onLeftClick, onRightClick } = props

  return (
    <div data-testid="calendar-header" className={styles.root}>
      <div
        data-testid="calendar-left-button"
        className={cx(styles.arrow, 'left')}
        onClick={onLeftClick}
      ></div>
      <div className={styles.headerContent}>{children}</div>
      <div
        data-testid="calendar-right-button"
        className={cx(styles.arrow, 'right')}
        onClick={onRightClick}
      ></div>
    </div>
  )
}
