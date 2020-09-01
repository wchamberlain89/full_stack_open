import React from 'react'
const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>{country.capital}</p>
      <p>{country.population}</p>
      {country.languages.map(language => <li>{language.name}</li>)}
      <img src={country.flag} />
    </>
  )
}

function Countries({ countries, filter }) {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
  
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (filteredCountries.length > 1) {
    return (
      filteredCountries.map(country => <p>{country.name}</p>)
    )
  }
  else if (filteredCountries.length === 1) {
    return (
      <CountryDetails country={filteredCountries[0]} />
    )
  }
  return null;
}

export default Countries;
