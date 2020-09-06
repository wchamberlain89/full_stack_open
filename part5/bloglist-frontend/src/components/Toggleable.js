import React from 'react';
import { useImperativeHandle } from 'react';



const Toggleable = React.forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = React.useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibilty = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibilty
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibilty}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibilty}>cancel</button>
      </div>
    </div>
  );
});

export default Toggleable;