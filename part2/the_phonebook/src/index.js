import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const CreateForm = ({ onSubmit, onChange }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
        <div>
          name: <input onChange={onChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const PhoneNumbers = ({ entries }) => {
  return (
    <>
      { entries.map((entry, index) => <h5 key={index}>{entry.name}</h5>) }
    </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')
  
  const handleSubmit = () => {
    setPersons(persons.concat({name: newName}))
    console.log(persons)
  }

  const updateNewName = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <CreateForm onSubmit={handleSubmit} onChange={updateNewName}/>
      <h2>Numbers</h2>
      <PhoneNumbers entries={persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))