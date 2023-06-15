import React from 'react'
import { Router } from 'react-router-dom'
import AppRouter from './routes/router'

import { createHistory } from './utils/createHistory'
import { historyStack } from './utils/historyStack'
import { HistoryStackWatcher } from './components/HistoryStackWatcher'

export const appHistory = createHistory()


historyStack.init(appHistory.location)

appHistory.listen((location, action) => {
  console.log(action, "history changed")
  historyStack.handleChange(location, action)
})

function App() {
  return <Router history={appHistory}>
    <>
    <HistoryStackWatcher/>
    {AppRouter()}
    </>
  </Router>
}

export default App
