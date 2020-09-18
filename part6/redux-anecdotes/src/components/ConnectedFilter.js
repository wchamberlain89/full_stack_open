import React from 'react';
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const styles = {
  padding: "15px",
  margin: "15px 0"
}

const Filter = (props) => {
  const setFilter = props
  
  const handleChange = (event) => {
    const filterTerm = event.target.value
    setFilter(filterTerm)
  }

  return (
    <div style={styles}>
      <label for='filter'>filter</label>
      <input name='filter' type='text' onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter
}

export default connect(null, mapDispatchToProps)(Filter);