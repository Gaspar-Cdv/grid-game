import { createUseStyles } from "react-jss"
import Dashboard from './Dashboard/Dashboard'
import Footer from './Footer/Footer'
import Grid from './Grid/Grid'

const useStyles = createUseStyles(theme => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: 20,
    border: [1, 'solid', 'black'],
    width: 'fit-content',
    minWidth: 300,
    margin: [50, 'auto']
  },
  button: {
    padding: [5, 10]
  }
}))

function App () {
  const classes = useStyles()
  
  return (
    <div className={classes.app}>
      <Dashboard />
      <Grid />
      <Footer />
    </div>
  )
}

export default App
