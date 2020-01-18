import { getMonth, getYear } from 'date-fns'

export const months = [
  { eng: 'january', rus: 'январь', jsNumber: 0, calendarNumber: 1 },
  { eng: 'february', rus: 'февраль', jsNumber: 1, calendarNumber: 2 },
  { eng: 'march', rus: 'март', jsNumber: 2, calendarNumber: 3 },
  { eng: 'april', rus: 'апрель', jsNumber: 3, calendarNumber: 4 },
  { eng: 'may', rus: 'май', jsNumber: 4, calendarNumber: 5 },
  { eng: 'june', rus: 'июнь', jsNumber: 5, calendarNumber: 6 },
  { eng: 'july', rus: 'июль', jsNumber: 6, calendarNumber: 7 },
  { eng: 'august', rus: 'август', jsNumber: 7, calendarNumber: 8 },
  { eng: 'september', rus: 'сентябрь', jsNumber: 8, calendarNumber: 9 },
  { eng: 'october', rus: 'октябрь', jsNumber: 9, calendarNumber: 10 },
  { eng: 'november', rus: 'ноябрь', jsNumber: 10, calendarNumber: 11 },
  { eng: 'december', rus: 'декабрь', jsNumber: 11, calendarNumber: 12 },
]

function checkCorrectType(type) {
  const types = ['films', 'games']

  return types.includes(type)
}

function checkCorrectMonth(month) {
  return Boolean(month && months.find(m => m.eng === month))
}

function checkCorrectYear(year) {
  const yearNumber = parseInt(year)

  return (
    year &&
    year.length === 4 &&
    year.startsWith('20') &&
    yearNumber >= 2020 &&
    yearNumber <= 2030
  )
}

export function checkAndCorrectURL(url) {
  // Формат урла: /{type}/{month}-{year}

  const date = new Date()
  const currentMonth = getMonth(date)
  const currentYear = getYear(date)

  const fallbackType = 'films'
  const fallbackMonth = months.find(m => m.jsNumber === currentMonth).eng
  const fallbackYear = currentYear

  let [, type, initMonthYear] = url.split('/')

  let monthYear = initMonthYear

  const isCorrectType = checkCorrectType(type)

  if (!isCorrectType) type = fallbackType

  if (!monthYear) monthYear = `${fallbackMonth}-${currentYear}`

  const parsedMonthYear = monthYear.split('-')

  let [month, year] = parsedMonthYear

  const isCorrectMonth = checkCorrectMonth(month)
  const isCorrectYear = checkCorrectYear(year)

  if (!isCorrectMonth) month = fallbackMonth
  if (!isCorrectYear) year = fallbackYear

  return {
    isCorrect:
      initMonthYear &&
      isCorrectYear &&
      isCorrectMonth &&
      isCorrectYear &&
      parsedMonthYear.length === 2,
    url: `/${type}/${month}-${year}`,
  }
}

export function parseCorrectUrl(url) {
  const [, type, monthYear] = url.split('/')
  const [month, year] = monthYear.split('-')

  return {
    type,
    month: months.find(m => m.eng === month).jsNumber,
    year: +year,
    rusMonth: months.find(m => m.eng === month).rus,
  }
}
