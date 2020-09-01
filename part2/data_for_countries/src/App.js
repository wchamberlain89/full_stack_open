import React from 'react';
import axios from 'axios';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data);
    });
  }, []);

  console.log(countries)

  const updateFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <input type="text" onChange={updateFilter}/>
      {filter}
      <Countries filter={filter} countries={countries} />
    </>
  )
}

export default App;