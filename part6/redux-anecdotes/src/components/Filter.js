import React from 'react';
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const styles = {
  padding: "15px",
  margin: "15px 0"
}

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    const filterTerm = event.target.value
    dispatch(setFilter(filterTerm))
  }


  return (
    <div style={styles}>
      <label for='filter'>filter</label>
      <input name='filter' type='text' onChange={handleChange} />
    </div>
  );
};

export default Filter;