import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import CreateForm from './CreateForm';


const PhoneNumbers = ({ filter, entries }) => {
  let filtered = entries.filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <>
      { filtered.map((entry, index) => {
        return (
          <PhoneNumber key={entry.name} name={entry.name} phoneNumber={entry.phoneNumber}/>
        ) 
      })}
    </>
  )
}

const PhoneNumber = ({ name, phoneNumber }) => {
  return (
    <>
      <h5>{name}</h5>
      <h5>{phoneNumber}</h5>
    </>
  )
}

const Filter = ({ onUpdateFilter }) => {
  return (
    <>
      <label>Filter By Name</label>      
      <input type="text" onChange={onUpdateFilter}/>
    </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phoneNumber: "971-444-4040" }
  ]);
  const [ filter, setFilter ] = useState('');
  const updateFilter = (event) => {
    setFilter(event.target.value);
  }
  const addPerson = (newPerson) => {
    validateName(newPerson.name) && setPersons(persons.concat({ name: newPerson.name, phoneNumber: newPerson.phoneNumber }))
  }

  const validateName = (name) => {
    const duplicates = persons.filter( person => {
      return (
        person.name === name
      ) 
    });

    if(duplicates.length > 0) {
      alert(`${name} is already added to the phonebook`);
    }  
        
    return duplicates.length < 1;
  }

  return (
    <div>
      <Filter onUpdateFilter={updateFilter} /> 
      <h2>Phonebook</h2>
      <CreateForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PhoneNumbers filter={filter} entries={persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))