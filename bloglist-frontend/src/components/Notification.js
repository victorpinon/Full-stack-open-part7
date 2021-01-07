import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, messageType }) => {
  let messageStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (messageType === 'success') {
    messageStyle.color = 'green'
  }
  else if (messageType === 'error') {
    messageStyle.color = 'red'
  }

  if (message === null) {
    return null
  }

  return (
    <div className={messageType} style={messageStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  messageType: PropTypes.string
}

export default Notification