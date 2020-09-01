import React from 'react'
const CountryDetails = ({ country, back }) => {
  console.log(back)
  return (
    <>
      <button onClick={back}>Back</button>
      <h1>{country.name}</h1>
      <p>{country.capital}</p>
      <p>{country.population}</p>
      {country.languages.map(language => <li>{language.name}</li>)}
      <img src={country.flag} />
    </>
  )
}

const Country = ({ country, handleClick }) => {
  return (
    <>
      <p>{country.name}</p>
      <button onClick={handleClick}>View</button>
    </>
  )
}

function Countries({ countries, filter }) {
  const [selectedCountry, setSelectedCountry] = React.useState(null);

  const selectCountry = ( index ) => {
    console.log("Selected Country is", index)
    setSelectedCountry(countries[index])
  }

  const deselectCountry = () => {
    console.log("active")
    setSelectedCountry(null);
  }

  console.log(selectedCountry)

  if (selectedCountry) {
    return (
      <CountryDetails back={deselectCountry} country={selectedCountry} />
    )
  }
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length > 1) {
    return (
      countries.map((country, index) => <Country key={country.name} country={country} handleClick={() => selectCountry(index)} /> )
    )
  }
  else if (countries.length === 1) {
    return (
      <CountryDetails prop={"I'm a fucking prop"} country={countries[0]} />
    )
  }
  return null;
}

export default Countries;
