import React from 'react'
import './notification.css';

const Notification = ({ message }) => {
  return (
    message ? 
      <div className="error">
      {message}
      </div> : null
  )
}

export default Notification;