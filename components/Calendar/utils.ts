export const today = new Date()

today.setHours(0, 0, 0, 0)

/**
 * Algorithm reference: http://calendars.wikia.com/wiki/Calculating_the_day_of_the_week
 * @param date
 * @returns { number } 0=Sunday,..6=Saturday
 */
export const getWeekDayByDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const d = date.getDate()
  const Y = month < 3 ? year - 1 : year
  const m = ((month + 9) % 12) + 1
  const y = Number(Y.toString().slice(-2))
  const c = Number(Y.toString().slice(0, 2))

  return (
    (((d +
      Math.floor(2.6 * m - 0.2) +
      y +
      Math.floor(y / 4) +
      Math.floor(c / 4) -
      2 * c) %
      7) +
      7) %
    7
  )
}

export const pos2DToId = (x: number, y: number) => {
  return `${x},${y}`
}

export const ArrayIndexToMatrixYPos = (
  position: number,
  columnCount: number
) => {
  const y = Math.ceil(position / columnCount) - 1

  return y
}

export type CalendarMatrix<T> = {
  rowNum: number
  columnNum: number
  getDayPos: (x: number, y: number) => T
}

// -------------- DateView Grid Utils --------------

export const getDateFromDateViewByMatrixPos = (
  year: number,
  month: number,
  x: number,
  y: number
) => {
  const firstDayOfTheMonth = new Date(year, month - 1, 1, 0, 0, 0, 0)

  const firstDayWeekDay = getWeekDayByDate(firstDayOfTheMonth)

  const position = x + y * 7

  const nextDate = new Date(
    year,
    month - 1,
    position - firstDayWeekDay + 1,
    0,
    0,
    0,
    0
  )

  return nextDate
}

export const dateToDateViewMatrix = (
  date: Date,
  maxRow: number,
  maxColumn: number
): CalendarMatrix<Date> => {
  const targetWeeks: Date[] = []

  const weekDay = getWeekDayByDate(date)

  const currentDate = new Date(date)

  const lastDayOfPrevMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    0,
    0,
    0,
    0,
    0
  )

  const lastDayOfCurrentMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    0,
    0,
    0,
    0
  ).getDate()

  const lastDayNextMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 2,
    0,
    0,
    0,
    0,
    0
  )

  const normalFiledRange = { from: 0, to: 0 }

  for (let i = 0; i < weekDay; i++) {
    targetWeeks.push(
      new Date(
        lastDayOfPrevMonth.getFullYear(),
        lastDayOfPrevMonth.getMonth(),
        lastDayOfPrevMonth.getDate() - weekDay + i + 1,
        0,
        0,
        0,
        0
      )
    )
  }

  normalFiledRange.from = weekDay

  for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
    targetWeeks.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i, 0, 0, 0, 0)
    )
  }

  normalFiledRange.to = lastDayOfCurrentMonth

  for (let i = 1; targetWeeks.length < maxColumn * maxRow; i++) {
    targetWeeks.push(
      new Date(
        lastDayNextMonth.getFullYear(),
        lastDayNextMonth.getMonth(),
        i,
        0,
        0,
        0,
        0
      )
    )
  }

  const weeks: Date[][] = []

  while (targetWeeks.length > 0) {
    const week = targetWeeks.splice(0, maxColumn)

    weeks.push(week)
  }

  return {
    rowNum: maxRow,
    columnNum: maxColumn,
    getDayPos(x: number, y: number) {
      return weeks[y][x]
    },
  }
}

export type DateMatrix = ReturnType<typeof dateToDateViewMatrix>

export const dateToDateViewMatrixPos = (date: Date) => {
  const weekDay = getWeekDayByDate(date)

  const firstDayOfTheMonth = new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
    0,
    0,
    0,
    0
  )

  const firstDayWeekDay = getWeekDayByDate(firstDayOfTheMonth)

  const y = ArrayIndexToMatrixYPos(date.getDate() + firstDayWeekDay, 7)

  return { x: weekDay, y }
}
