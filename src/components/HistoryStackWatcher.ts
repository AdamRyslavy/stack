import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'


export function HistoryStackWatcher() {
    const history = useHistory<{isRefresh: boolean}>()


    useEffect(() => {
        const beforeUnload = () =>{
            history.replace({...history.location, state: {...history.location.state, isRefresh: true}})
        }

        window.addEventListener("beforeunload", beforeUnload)

        return () =>  window.removeEventListener("beforeunload", beforeUnload)
    }, [history])

  return null
}
