import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type route = { pathname: string; key?: string }

const initialState = {
  routes: [] as route[],
}

const routerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateNavigationStack: (state, { payload }: PayloadAction<route[]>) => {
      state.routes = payload
    },
  },
})

export const { updateNavigationStack } = routerSlice.actions

export default routerSlice.reducer
