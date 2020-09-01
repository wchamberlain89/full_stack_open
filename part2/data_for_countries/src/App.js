import React from 'react';
import axios from 'axios';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  console.log(process.env.REACT_APP_API_KEY);
  React.useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data);
    });
  }, []);

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <input type="text" onChange={updateFilter}/>
      <Countries filter={filter} countries={filteredCountries} />
    </>
  )
}

export default App;