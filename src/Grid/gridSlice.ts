import { createSlice } from '@reduxjs/toolkit'
import { incrementCount, resetDashboard, startTimer, stopTimer } from '../Dashboard/dashboardSlice'
import { AppThunk, RootState } from '../store/store'
import { chance, randInt } from '../misc/utils'

export enum GameStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED
}

interface GridState {
  grid: number[][]
  height: number
  width: number
  status: GameStatus
}

const initialState: GridState = {
  grid: [...Array(2)].map(() => [...Array(2)].fill(0)),
  height: 2,
  width: 2,
  status: GameStatus.NOT_STARTED
}

export const gridSlice = createSlice({
  name: 'grid',
  initialState,
  reducers: {
    update: (state, action) => {
      const { x, y, value } = action.payload
      state.grid = [...state.grid].map((line, i) => {
        return line.map((cell, j) => {
          return i === y || j === x ? cell + value : cell
        })
      })
    },
    setWidth: (state, action) => {
      state.width = action.payload
    },
    setHeight: (state, action) => {
      state.height = action.payload
    },
    resetGrid: (state) => {
      state.grid = [...Array(state.height)].map(() => [...Array(state.width)].fill(0))
      state.status = GameStatus.NOT_STARTED
    },
    setStatus: (state, action) => {
      state.status = action.payload
    }
  }
})

export const handleGridChange = (): AppThunk => (dispatch, getState) => {
  dispatch(incrementCount())

  if (getState().grid.status === GameStatus.NOT_STARTED) {
    dispatch(setStatus(GameStatus.IN_PROGRESS))
    dispatch(startTimer())
  }

  const isFinished = getState().grid.grid.every((line) => line.every((cell) => cell === 0))
  if (isFinished) {
    dispatch(setStatus(GameStatus.FINISHED))
    dispatch(stopTimer())
  }
}

export const resetGame = (): AppThunk => (dispatch, getState) => {
  dispatch(resetDashboard())
  dispatch(resetGrid())
  for (let i = 0; i < 50; i++) {
    dispatch(update({
      x: randInt(getState().grid.width),
      y: randInt(getState().grid.height),
      value: chance() ? 1 : -1
    }))
  }
}

export const { update, setWidth, setHeight, resetGrid, setStatus } = gridSlice.actions

export const gridSelector = (state: RootState) => state.grid.grid
export const heightSelector = (state: RootState) => state.grid.height
export const widthSelector = (state: RootState) => state.grid.width
export const isFinishedSelector = (state: RootState) => state.grid.status === GameStatus.FINISHED
export const isNotStartedSelector = (state: RootState) => state.grid.status === GameStatus.NOT_STARTED

export default gridSlice.reducer
