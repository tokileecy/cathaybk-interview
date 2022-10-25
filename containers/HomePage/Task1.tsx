import { useState } from 'react'
import Calendar from '@/components/Calendar'

const today = new Date()

export default function Taks1() {
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth() + 1)
  const [viewYear, setViewYear] = useState<number>(today.getFullYear())
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

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
    <div>
      <h2>Task – 1 (Date Range Component for current month)</h2>
      <Calendar
        disableNonCurrentMonthDayClick
        viewMonth={viewMonth}
        viewYear={viewYear}
        startDate={startDate}
        endDate={endDate}
        onSelect={handleSelect}
        onLeftClick={handleLeftArrowClick}
        onRightClick={handleRightArrowClick}
      />
    </div>
  )
}
