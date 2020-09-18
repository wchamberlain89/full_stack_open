import React from 'react'

const useField = (type) => {
  const [value, setValue] = React.useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetField = () => {
    setValue('')
  }

  return {
    props: {
      type,
      value,
      onChange,
    },
    resetField
  }
}

export default useField