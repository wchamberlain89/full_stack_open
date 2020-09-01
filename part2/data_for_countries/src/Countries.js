import React from 'react'
import Axios from 'axios'
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
      <Weather location={country.capital} />
    </>
  )
}

const Weather = ({ location }) => {
  const [currentWeather, setCurrentWeather] = React.useState(null);

  React.useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: location
    }
    Axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
      setCurrentWeather(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, []); 

  return (
    currentWeather && <>
     <h2>Weather in {location}</h2>
     <h5>Temperature {currentWeather.current.temperature}</h5>
     <img src={currentWeather.current.weather_icons[0]}/>
     <h5>wind {currentWeather.current.wind_speed}</h5>
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
  else if (countries.length > 0) {
    return (
      countries.map((country, index) => <Country key={country.name} country={country} handleClick={() => selectCountry(index)} /> )
    )
  }

  return null;
}

export default Countries;
