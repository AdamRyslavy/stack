import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RouterType } from '../types/router'
import pagesData from './routes.tsx'

const AppRouter = () => {
  const pageRoutes = pagesData.map(
    ({ title, element, ...rest }: RouterType) => {
      const Component = element
      return (
        <Route key={title} {...rest}>
          <Component />
        </Route>
      )
    }
  )

  return pageRoutes
}

export default AppRouter
