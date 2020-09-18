import React from 'react'

const useField = (type) => {
  const [value, setValue] = React.useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export default useField