import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeNotification } from '../reducers/notificationReducer'

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

  let messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification) {
    if (notification.type === 'success') {
      messageStyle.color = 'green'
    }
    else if (notification.type === 'error') {
      messageStyle.color = 'red'
    }
    return (
      <div className={notification.type} style={messageStyle}>
        {notification.message}
      </div>
    )
  } else {
    return (null)
  }
}

export default Notification