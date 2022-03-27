import { createUseStyles } from 'react-jss'
import { levels } from '../misc/constants'
import { countSelector } from '../Dashboard/dashboardSlice'
import { isFinishedSelector, isNotStartedSelector, resetGame, setHeight, setWidth } from '../Grid/gridSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

const useStyles = createUseStyles(theme => ({
  button: {
    padding: [5, 10]
  }
}))

function Footer () {
  const classes = useStyles()
  const isFinished = useAppSelector(isFinishedSelector)
  const isNotStarted = useAppSelector(isNotStartedSelector)
  const count = useAppSelector(countSelector)
  const dispatch = useAppDispatch()

  const handleChange = (e: React.FormEvent) => {
    const level = levels.find(lvl => lvl.name === (e.target as HTMLSelectElement).value)
    if (level) {
      dispatch(setWidth(level.width))
      dispatch(setHeight(level.height))
      dispatch(resetGame())
    }
  }

  return (
    <>
      <select onChange={handleChange}>
        {levels.map(({ name }) => {
          return (
            <option key={name} value={name}>{name}</option>
          )
        })}
      </select>

      {isFinished && <span>Congratulations ! You finished in {count} turns !</span>}

      <button
        className={classes.button}
        onClick={() => dispatch(resetGame())}
        disabled={isNotStarted}
      >{isFinished ? 'TRY AGAIN' : 'RESTART'}</button>
    </>
  )
}

export default Footer