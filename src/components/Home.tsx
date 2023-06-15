import React from 'react'
import { useAppHistory } from '../hooks/useAppHistory'

export default function Home() {
  const history = useAppHistory()
  document.title = 'home'
  return (
    <button onClick={() => history.push('/jedna')}>navigate to jedna</button>
  )
}
