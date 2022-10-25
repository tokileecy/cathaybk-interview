import React, { ReactNode } from 'react'
import { cx } from '@emotion/css'
import * as styles from './Header.styles'

export interface HeaderProps {
  children?: ReactNode
  onLeftClick?: () => void
  onRightClick?: () => void
}

export default function Header(props: HeaderProps) {
  const { children, onLeftClick, onRightClick } = props

  return (
    <div className={styles.root}>
      <div className={cx(styles.arrow, 'left')} onClick={onLeftClick}></div>
      <div className={styles.headerContent}>{children}</div>
      <div className={cx(styles.arrow, 'right')} onClick={onRightClick}></div>
    </div>
  )
}
