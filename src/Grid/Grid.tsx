import { useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { gridSelector, resetGame } from './gridSlice'
import Line from './Line'

const useStyles = createUseStyles({
  grid: {
    borderCollapse: 'collapse'
  }
})

export default function Grid() {
  const grid = useAppSelector(gridSelector)
  const classes = useStyles()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetGame())
  }, [dispatch])

  return (
    <table className={classes.grid}>
      <tbody>
        {grid.map((line, y) => (
          <Line key={`line-${y}`} y={y}>
            {line}
          </Line>
        ))}
      </tbody>
    </table>
  );
}
