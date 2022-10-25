import { css } from '@emotion/css'
import colors from '@/styles/colors'

const arrowSize = 2

export const root = css({
  'width': '350px',
  'height': '44px',
  'marginBottom': '16px',
  'display': 'inline-flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
})

export const headerContent = css({
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': ' center',
  'flexGrow': 1,
})

export const arrow = css({
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'width': '44px',
  'height': '44px',
  'cursor': 'pointer',
  'WebkitTapHighlightColor': 'rgba(0,0,0,0)',
  'backgroundColor': 'white',
  '&:hover': {
    'backgroundColor': colors.gray,
  },
  '&::before': {
    content: '""',
    border: 'solid black',
    borderWidth: `0 ${arrowSize}px ${arrowSize}px 0`,
    display: 'inline-block',
    padding: `${arrowSize}px`,
    height: `${arrowSize}px`,
    width: `${arrowSize}px`,
    verticalAlign: 'middle',
  },
  '&.left::before': {
    transform: 'rotate(135deg)',
  },
  '&.right::before': {
    transform: 'rotate(-45deg)',
  },
})
