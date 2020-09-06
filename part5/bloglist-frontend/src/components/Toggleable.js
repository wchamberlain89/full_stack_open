import React from 'react';

const Toggleable = ({ children, buttonLabel }) => {
  const [visible, setVisible] = React.useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibilty = () => {
    setVisible(!visible)
  }
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
};

export default Toggleable;