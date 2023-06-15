import React from 'react'
import { useAppHistory } from '../hooks/useAppHistory'

export default function Tri() {
  const history = useAppHistory()
  document.title = 'tri'
  return <button onClick={() => history.replace('/dva')}>replace to dva</button>
}
