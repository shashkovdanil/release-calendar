import { useEffect } from 'react'
import { navigate } from 'gatsby'
import { checkAndCorrectURL, parseCorrectUrl } from '../utils/handle-url'

function useCorrectURL({ pathname }) {
  const { isCorrect, url } = checkAndCorrectURL(pathname)

  useEffect(() => {
    if (isCorrect) return

    navigate(url)
  }, [pathname, isCorrect, url])

  return parseCorrectUrl(url)
}

export default useCorrectURL
