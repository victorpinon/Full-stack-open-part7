import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'
import Alert from '@material-ui/lab/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const timeout = useRef(null)

  useEffect(() => {
    if (notification) {
      window.clearTimeout(timeout.current)
      timeout.current = window.setTimeout(() => {
        dispatch(removeNotification())
      }, notification.time * 1000)
    }
  }, [notification, dispatch])

  if (notification) {
    return (
      <Alert severity={notification.type}>
        {notification.message}
      </Alert>
    )
  } else {
    return (null)
  }
}

export default Notification