import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const CreateForm = ({ onSubmit, onChange, onUpdateNumber }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>
            name: 
          </label>
          <input name="name" onChange={onChange} />
          <label>
            number: 
          </label>
          <input name="phoneNumber" onChange={onChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const PhoneNumbers = ({ filter, entries }) => {
  let filtered = entries.filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <>
      { filtered.map((entry, index) => {
        return (
          <>
          <h5 key={index}>{entry.name}</h5>
          <h5 key={index}>{entry.phoneNumber}</h5>
          </>
        ) 
      })}
    </>
  )
}

const Filter = () => {
  const [ filter, setFilter ] = useState('');
  
  return (
    <>
      <label>Filter By Name</label>      
      <input type="text" onChange={(event) => setFilter(event.target.value)}/>
    </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phoneNumber: "971-444-4040" }
  ])
  const [ newPerson, setNewPerson ] = useState({
  });
  const [ filter, setFilter ] = useState('');
  
  const handleSubmit = () => {
    const isValid = validateName(newPerson);
    isValid && setPersons(persons.concat({ name: newPerson.name, phoneNumber: newPerson.phoneNumber }))
  }
  
  const onChange = (event) => {
    setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
    console.log(newPerson);
  }

  const updateFilter = ( event ) => {
    setFilter(event.target.value);
  }

  const validateName = (name) => {
    const validation = persons.filter( person => {
      return (
        person.name === name
        ) 
      })

      if(validation.length > 0) {
        alert(`${name} is already added to the phonebook`);
      }  
        
      return validation.length < 1;
   }

  


  return (
    <div>
      <label>Filter by name</label>
      <input type="text" onChange={updateFilter} />
      <h2>Phonebook</h2>
      <CreateForm onSubmit={handleSubmit} onChange={onChange} />
      <h2>Numbers</h2>
      <PhoneNumbers filter={filter} entries={persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))