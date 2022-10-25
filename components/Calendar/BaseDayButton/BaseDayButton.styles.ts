import colors from '@/styles/colors'
import { css } from '@emotion/css'

export const root = css({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'userSelect': 'none',
  'cursor': 'pointer',
  'width': '50px',
  'height': '36px',
  'color': colors.dateDefaultColor,
  '&:hover': {
    backgroundColor: colors.dateHoverBgColor,
  },
  '&.is-today': {
    'backgroundColor': colors.dateTodayBgColor,
  },
  '&.non-current-month': {
    'color': colors.dateNonCurrentMonthColor,
  },
  '&.disable-click': {
    cursor: 'not-allowed',
  },
  '&.active, &.active:hover': {
    'backgroundColor': colors.dateActiveBgColor,
    'color': colors.dateActiveColor,
  },
})
