import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import CreateForm from './CreateForm';
import personsService from './services/persons';

const PhoneNumbers = ({ filter, entries }) => {
  let filtered = entries.filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <>
      { filtered.map((entry, index) => {
        return (
          <PhoneNumber key={entry.name} name={entry.name} number={entry.number}/>
        ) 
      })}
    </>
  )
}

const PhoneNumber = ({ name, number }) => {
  return (
    <>
      <h5>{name}</h5>
      <h5>{number}</h5>
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
  const [persons, setPersons] = useState([]);

  React.useEffect(() => {
    personsService.getAll().then( response => {
      setPersons(response)
    })
  }, []);

  const [ filter, setFilter ] = useState('');
  const updateFilter = (event) => {
    setFilter(event.target.value);
  }
  const addPerson = (newPerson) => {
    console.log(newPerson)
    if (validateName(newPerson.name)) {
      personsService.create(newPerson)
      setPersons(persons.concat({ name: newPerson.name, number: newPerson.number }))
    }
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