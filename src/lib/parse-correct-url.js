import { months } from '../constants/months'

function parseCorrectUrl(url) {
  const [, type, monthYear] = url.split('/')
  const [month, year] = monthYear.split('-')

  return {
    type,
    month: months.find(m => m.eng === month),
    year: +year,
  }
}

export default parseCorrectUrl
