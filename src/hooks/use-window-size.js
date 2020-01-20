import { useState, useEffect } from 'react'
import throttle from 'lodash.throttle'

function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize())

  useEffect(() => {
    if (!isClient) return false

    const handleResize = throttle(() => {
      setWindowSize(getSize())
    }, 100)

    window.addEventListener('resize', handleResize)

    return function cleanup() {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return windowSize
}

export default useWindowSize
