import React from 'react'
import { useSelector } from 'react-redux'

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1
}

const Notification = () => {
  const notification = useSelector(state => state.notification.message)

  return (
    notification ? <div style={style}>
      {notification}
    </div> : null
  )
}

export default Notification