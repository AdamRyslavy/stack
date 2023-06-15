import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import router from './slices/router'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    router,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
