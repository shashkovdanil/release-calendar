export default function isValidUrl(type, month, year) {
  if (
    (type === 'films' || type === 'games') &&
    +month >= 0 &&
    +month <= 11 &&
    year
  )
    return true
  return false
}