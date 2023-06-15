import React from 'react'

import { RouterType } from '../types/router'
import Dva from '../components/Dva'
import Home from '../components/Home'
import Jedna from '../components/Jedna'
import Tri from '../components/Tri'

const pagesData: readonly RouterType[] = [
  {
    path: '/',
    element: Home,
    title: 'home',
    exact: true,
  },
  {
    path: '/jedna',
    element: Jedna,
    title: 'jedna',
  },
  {
    path: '/dva',
    element: Dva,
    title: 'dva',
  },
  {
    path: '/tri',
    element: Tri,
    title: 'tri',
  },
] as const

export enum KnownPaths {
  '/',
  '/jedna',
  '/dva',
  '/tri',
}

export default pagesData
