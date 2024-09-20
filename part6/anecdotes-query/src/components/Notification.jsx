import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppState } from '../AppContext'

const Notification = ({ timeoutInSeconds = 5 }) => {
  const { notification } = useAppState()
  const dispatch = useAppDispatch()
  const timerId = useRef(undefined)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    if (notification) {
      timerId.current = setTimeout(() => {
        dispatch({ type: 'setNotification', payload: '' })
      }, timeoutInSeconds * 1000)
    }

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current)
      }
    }
  }, [notification, dispatch, timeoutInSeconds])

  if (!notification) return null

  return <div style={style}>{notification}</div>
}

export default Notification
