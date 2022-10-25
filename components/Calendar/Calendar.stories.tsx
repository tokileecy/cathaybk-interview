import React, { useEffect, useState } from 'react'
import { Story, Meta } from '@storybook/react'
import Calendar, { CalendarProps } from './Calendar'
import { today } from './utils'

export default {
  title: 'components/Calendar',
  component: Calendar,
  argTypes: {},
} as Meta

const Template: Story<CalendarProps> = (args) => {
  return <Calendar {...args} />
}

export const Normal = Template.bind({})

Normal.args = {
  viewMonth: today.getMonth() + 1,
  viewYear: today.getFullYear(),
  startDate: new Date('2022-10-20'),
  endDate: new Date('2022-11-24'),
  disableNonCurrentMonthDayClick: false,
}

const Task1Template: Story<CalendarProps> = (args) => {
  const [viewMonth, setViewMonth] = useState<number>(
    args.viewMonth ?? today.getMonth() + 1
  )

  const [viewYear, setViewYear] = useState<number>(
    args.viewYear ?? today.getFullYear()
  )

  const [startDate, setStartDate] = useState<Date | null>(args.startDate)
  const [endDate, setEndDate] = useState<Date | null>(args.endDate)

  useEffect(() => {
    setViewMonth(args.viewMonth ?? today.getMonth() + 1)
  }, [args.viewMonth])

  useEffect(() => {
    setViewYear(args.viewYear ?? today.getFullYear())
  }, [args.viewYear])

  useEffect(() => {
    setStartDate(args.startDate)
  }, [args.startDate])

  useEffect(() => {
    setEndDate(args.endDate)
  }, [args.endDate])

  const handleSelect = (date: Date) => {
    if (startDate === null) {
      setStartDate(new Date(date))
    } else if (date < startDate && endDate === null) {
      setEndDate(new Date(startDate))
      setStartDate(new Date(date))
    } else if (date < startDate && endDate !== null) {
      setStartDate(new Date(date))
    } else if (date >= startDate) {
      setEndDate(new Date(date))
    }
  }

  const handleLeftArrowClick = () => {
    const nextDate = new Date(viewYear, viewMonth - 2, 1)

    setViewYear(nextDate.getFullYear())
    setViewMonth(nextDate.getMonth() + 1)
    setEndDate(null)
    setStartDate(null)
  }

  const handleRightArrowClick = () => {
    const nextDate = new Date(viewYear, viewMonth, 1)

    setViewYear(nextDate.getFullYear())
    setViewMonth(nextDate.getMonth() + 1)
    setEndDate(null)
    setStartDate(null)
  }

  return (
    <Calendar
      {...args}
      viewMonth={viewMonth}
      viewYear={viewYear}
      startDate={startDate}
      endDate={endDate}
      onSelect={handleSelect}
      onLeftClick={handleLeftArrowClick}
      onRightClick={handleRightArrowClick}
    />
  )
}

export const Task1 = Task1Template.bind({})

Task1.args = {
  viewMonth: today.getMonth() + 1,
  viewYear: today.getFullYear(),
  startDate: null,
  endDate: null,
}

const Task2Template: Story<CalendarProps> = (args) => {
  const [viewMonth, setViewMonth] = useState<number>(
    args.viewMonth ?? today.getMonth() + 1
  )

  const [viewYear, setViewYear] = useState<number>(
    args.viewYear ?? today.getFullYear()
  )

  const [startDate, setStartDate] = useState<Date | null>(
    args.startDate ?? null
  )

  const [endDate, setEndDate] = useState<Date | null>(args.endDate ?? null)

  useEffect(() => {
    setViewMonth(args.viewMonth ?? today.getMonth() + 1)
  }, [args.viewMonth])

  useEffect(() => {
    setViewYear(args.viewYear ?? today.getFullYear())
  }, [args.viewYear])

  useEffect(() => {
    setStartDate(args.startDate ?? null)
  }, [args.startDate])

  useEffect(() => {
    setEndDate(args.endDate ?? null)
  }, [args.endDate])

  const handleSelect = (date: Date) => {
    if (startDate === null) {
      setStartDate(new Date(date))
    } else if (date < startDate) {
      setStartDate(new Date(date))
      setEndDate(null)
    } else if (date >= startDate) {
      setEndDate(new Date(date))
    }
  }

  const handleLeftArrowClick = () => {
    const nextDate = new Date(viewYear, viewMonth - 2, 1)

    setViewYear(nextDate.getFullYear())
    setViewMonth(nextDate.getMonth() + 1)
  }

  const handleRightArrowClick = () => {
    const nextDate = new Date(viewYear, viewMonth, 1)

    setViewYear(nextDate.getFullYear())
    setViewMonth(nextDate.getMonth() + 1)
  }

  return (
    <Calendar
      {...args}
      viewMonth={viewMonth}
      viewYear={viewYear}
      startDate={startDate}
      endDate={endDate}
      onSelect={handleSelect}
      onLeftClick={handleLeftArrowClick}
      onRightClick={handleRightArrowClick}
    />
  )
}

export const Task2 = Task2Template.bind({})

Task2.args = {
  viewMonth: today.getMonth() + 1,
  viewYear: today.getFullYear(),
  startDate: null,
  endDate: null,
}
