import React from 'react'
import { useAppHistory } from '../hooks/useAppHistory'

export default function Dva() {
  const history = useAppHistory()
  document.title = 'dva'
  return (
    <button onClick={() => history.push('/jedna')}>push to jedna</button>
  )
}
