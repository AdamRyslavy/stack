import React from 'react'
import { useAppHistory } from '../hooks/useAppHistory'

export default function Jedna() {
  const history = useAppHistory()
  document.title = 'jedna'

  return <button onClick={() => history.push('/tri')}>push to tri</button>
}
