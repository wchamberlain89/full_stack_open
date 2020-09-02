import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import CreateForm from './CreateForm';
import personsService from './services/persons';
import Notification from './Notification';

const PhoneNumbers = ({ filter, entries, onRemovePerson }) => {
  let filtered = entries.filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))

  const removeNumber = (id) => {
    if(window.confirm()){
      personsService.remove(id);
      onRemovePerson(id);
    }
  }

  return (
    <>
      { filtered.map((entry, index) => {
        return (
          <PhoneNumber id={entry.id} name={entry.name} number={entry.number} onRemove={() => removeNumber(entry.id)}/>
        ) 
      })}
    </>
  )
}

const PhoneNumber = ({ name, number, onRemove }) => {
  return (
    <>
      <h5>{name}</h5>
      <h5>{number}</h5>
      <button onClick={onRemove}>Delete</button>
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
  const [errorMessage, setErrorMessage] = useState(null);

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
    if (validateDuplicate(newPerson.name)) {
      console.log("name is valid")
      personsService.create(newPerson)
      .then(
        setMessage(`Added ${newPerson.name}`)
      )
      setPersons(persons.concat({ name: newPerson.name, number: newPerson.number }))
    } else {
      if(window.confirm(`${newPerson.name} already exist in the phonebook, would you like to replace the old one?`)) {
        personsService.update(persons.filter(person => newPerson.name === person.name)[0].id, newPerson)
        .then(
          setMessage(`Updated ${newPerson.name}`)
        )
        setPersons(persons.map(person => person.name === newPerson.name ? newPerson : person))  
      }
    }
  }

  const setMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const removePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id ));
  }

  const validateDuplicate = (name) => {
    const duplicates = persons.filter( person => {
      return (
        person.name === name
      ) 
    });
        
    return duplicates.length < 1;
  }

  return (
    <div>
      <Filter onUpdateFilter={updateFilter} />
      <Notification message={errorMessage} /> 
      <h2>Phonebook</h2>
      <CreateForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <PhoneNumbers filter={filter} onRemovePerson={removePerson} entries={persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))