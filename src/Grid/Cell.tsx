import { SyntheticEvent } from 'react'
import { createUseStyles } from 'react-jss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { handleGridChange, isFinishedSelector, update } from './gridSlice'

interface JssProps {
  isFinished: boolean
}

const useStyles = createUseStyles({
  cell: ({ isFinished }: JssProps) => ({
    cursor: isFinished ? 'auto' : 'pointer',
    border: '1px solid #000',
    width: 30,
    height: 30,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover' : {
      backgroundColor: isFinished ? 'transparent' : 'lightgrey'
    }
  })
})

interface CellProps {
  children: number
  x: number
  y: number
}

export default function Cell ({ children, x, y }: CellProps) {
  const isFinished = useAppSelector(isFinishedSelector)
  const classes = useStyles({ isFinished })
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(update({ x, y, value: 1 }))
    dispatch(handleGridChange())
  }

  const handleContextMenu = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(update({ x, y, value: -1 }))
    dispatch(handleGridChange())
  }

  return (
    <td className={classes.cell} {...!isFinished && { onClick: handleClick, onContextMenu: handleContextMenu }}>
      {children}
    </td >
  )
}
