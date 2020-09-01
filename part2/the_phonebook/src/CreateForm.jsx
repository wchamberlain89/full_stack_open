import React, { useState } from 'react';

const CreateForm = ({ onSubmit }) => {
  const [ newEntry, setNewEntry ] = useState({
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newEntry);
  }

  const handleChange = (event) => {
    setNewEntry({ ...newEntry, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>
            name: 
          </label>
          <input name="name" onChange={handleChange} />
          <label>
            number: 
          </label>
          <input name="phoneNumber" onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default CreateForm;