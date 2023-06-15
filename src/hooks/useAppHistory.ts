import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { KnownPaths } from '../routes/routes.tsx'

export const useAppHistory = () => {
  const history = useHistory()

  const push = useCallback(
    (path: keyof typeof KnownPaths) => {
      history.push(path)
    },
    [history]
  )

  return {
    ...history,
    push,
  }
}
