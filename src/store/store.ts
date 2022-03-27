import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import dashboardSlice from '../Dashboard/dashboardSlice'
import gridReducer from '../Grid/gridSlice'

const store = configureStore({
  reducer: {
    grid: gridReducer,
    dashboard: dashboardSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
