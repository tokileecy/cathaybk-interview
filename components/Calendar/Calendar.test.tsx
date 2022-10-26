import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import * as dayButtonStyles from './BaseDayButton/BaseDayButton.styles'
import Calendar from './Calendar'

describe('<Calendar />', () => {
  test('should display correct active day buttons', async () => {
    const { container } = render(
      <Calendar
        viewMonth={10}
        viewYear={2022}
        startDate={new Date('2022-10-26')}
        endDate={new Date('2022-10-30')}
      />
    )

    const activeDayButtons = container.querySelectorAll(
      `.${dayButtonStyles.root}.active`
    )

    expect(activeDayButtons.length).toBe(5)
    expect(activeDayButtons[0].textContent).toBe('26')
    expect(activeDayButtons[activeDayButtons.length - 1].textContent).toBe('30')
  })

  test('if is on current month, should exist is-today day button', async () => {
    const today = new Date()

    const { container } = render(
      <Calendar
        viewMonth={today.getMonth() + 1}
        viewYear={today.getFullYear()}
      />
    )

    const isTodayDayButtons = container.querySelectorAll(
      `.${dayButtonStyles.root}.is-today`
    )

    expect(isTodayDayButtons.length).toBe(1)
    expect(isTodayDayButtons[0].textContent).toBe(today.getDate().toString())
  })

  test('day button clicked should call callback', async () => {
    const mockClickCallBack = jest.fn()

    render(
      <Calendar
        viewMonth={10}
        viewYear={2022}
        startDate={new Date('2022-10-26')}
        endDate={new Date('2022-10-30')}
        onSelect={mockClickCallBack}
      />
    )

    const baseDayButtons = screen.getAllByTestId('calendar-base-day-button')

    baseDayButtons.forEach((baseDayButton) => {
      fireEvent.click(baseDayButton)
    })
    expect(mockClickCallBack.mock.calls.length).toEqual(42)
  })

  test('non current month day button should not call click callabck when click', async () => {
    const mockClickCallBack = jest.fn()

    render(
      <Calendar
        viewMonth={10}
        viewYear={2022}
        startDate={new Date('2022-10-26')}
        endDate={new Date('2022-10-30')}
        onSelect={mockClickCallBack}
        disableNonCurrentMonthDayClick
      />
    )

    const baseDayButtons = screen.getAllByTestId('calendar-base-day-button')

    baseDayButtons.forEach((baseDayButton) => {
      fireEvent.click(baseDayButton)
    })

    expect(mockClickCallBack.mock.calls.length).toEqual(31)
  })

  test('left, right button callback should call when click', async () => {
    const mockLeftClickCallBack = jest.fn()
    const mockRightClickCallBack = jest.fn()

    render(
      <Calendar
        onLeftClick={mockLeftClickCallBack}
        onRightClick={mockRightClickCallBack}
      />
    )

    const leftButton = screen.getByTestId('calendar-left-button')
    const rightButton = screen.getByTestId('calendar-right-button')

    fireEvent.click(leftButton)
    expect(mockLeftClickCallBack.mock.calls.length).toEqual(1)
    fireEvent.click(rightButton)
    expect(mockRightClickCallBack.mock.calls.length).toEqual(1)
  })

  test('default header content should be base on today', async () => {
    const today = new Date()

    render(<Calendar />)

    const header = screen.getByTestId('calendar-header')

    expect(header.textContent).toEqual(
      `${today.getFullYear()}年${today.getMonth() + 1}月`
    )
  })
})
