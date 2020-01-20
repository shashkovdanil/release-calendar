import { useEffect, useContext } from 'react'
import { FirebaseContext } from '../components'

function useFirebase(fn, deps = []) {
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
    if (!firebase) {
      return
    }
    return fn(firebase)
  }, [firebase, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useFirebase
