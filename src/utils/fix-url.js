import { getMonth, getYear } from 'date-fns'

export default function fixUrl(type, month, year) {
  const date = new Date()

  if (type !== 'films' && type !== 'games') type = 'films'
  if (!month) month = getMonth(date)
  else if (+month > 11) month = 0
  else if (+month < 0) month = 0

  if (!year) year = getYear(date)

  return `/${type}/${year}/${month}`
}