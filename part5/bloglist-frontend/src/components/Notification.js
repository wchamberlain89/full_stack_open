import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
const Notification = () => {
  const notification = useSelector(state => state.notification)
  return (
    notification ?
      <Alert severity='info'>
        {notification}
      </Alert> : null
  )
}

export default Notification