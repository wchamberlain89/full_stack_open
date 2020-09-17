import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearMessage } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage())
    }, 10000)
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    notification ? <div style={style}>
      {notification}
    </div> : null
  )
}

export default Notification