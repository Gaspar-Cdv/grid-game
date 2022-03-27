import { createSlice } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../store/store'
import { secondsFrom } from '../misc/utils'

interface DashboardState {
  count: number
  time: number
  timer?: NodeJS.Timer
}

const initialState: DashboardState = {
  count: 0,
  time: 0,
  timer: undefined
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboard: (state) => {
      clearInterval(state.timer as NodeJS.Timer)
      state.timer = undefined
      state.count = 0
      state.time = 0
    },
    incrementCount: (state) => {
      state.count += 1
    },
    setTime: (state, action) => {
      state.time = action.payload
    },
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    stopTimer: (state) => {
      clearInterval(state.timer as NodeJS.Timer)
      state.timer = undefined
    }
  }
})

export const startTimer = (): AppThunk => (dispatch, getState) => {
  const startTimestamp = Date.now()
  dispatch(setTimer(
    setInterval(() => {
      dispatch(setTime(secondsFrom(startTimestamp)))
    }, 50)
  ))
}

export const { resetDashboard, incrementCount, setTime, setTimer, stopTimer } = dashboardSlice.actions

export const countSelector = (state: RootState) => state.dashboard.count
export const timeSelector = (state: RootState) => state.dashboard.time

export default dashboardSlice.reducer
