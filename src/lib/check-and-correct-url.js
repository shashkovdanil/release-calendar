import { getMonth, getYear } from 'date-fns'
import { months } from '../constants/months'

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

function checkAndCorrectURL(url) {
  // Формат урла: /{type}/{month}-{year}

  const date = new Date()
  const currentMonth = getMonth(date)
  const currentYear = getYear(date)

  const fallbackType = 'films'
  const fallbackMonth = months.find(m => m.jsNumber === currentMonth).eng
  const fallbackYear = currentYear

  let [, initType, initMonthYear] = url.split('/')

  let monthYear = initMonthYear
  let type = initType

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
    isCorrect: Boolean(
      checkCorrectType(initType) &&
        initMonthYear &&
        isCorrectYear &&
        isCorrectMonth &&
        isCorrectYear &&
        parsedMonthYear.length === 2,
    ),
    url: `/${type}/${month}-${year}`,
  }
}

export default checkAndCorrectURL
