import { createUseStyles } from 'react-jss'
import { useAppSelector } from '../store/hooks'
import { formatTime } from '../misc/utils'
import { countSelector, timeSelector } from './dashboardSlice'

const useStyles = createUseStyles({
  dashboard: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20
  }
})

function Dashboard () {
  const classes = useStyles()
  const time = useAppSelector(timeSelector)
  const count = useAppSelector(countSelector)

  return (
    <div className={classes.dashboard}>
      <span>Time: {formatTime(time)}</span>
      <span>Count: {count}</span>
    </div>
  )
}

export default Dashboard