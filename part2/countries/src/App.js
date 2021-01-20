import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country, weather }) => {

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
      {country.languages.map(language=><li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img height='150' src={country.flag} alt={country.name} />
      <h1>Weather in {weather.location.name}</h1>
      <p>temperature: {weather.current.temperature} celsius</p>
      <img height='50' src={weather.current.weather_icons[0]} alt={country.name} />
      <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}



const MultipleCountryList = ({ countries, clickHandler }) => {

  const toList = (country) => {
    return (
      <div>
      <li>{country.name}<button onClick={clickHandler(country)}>show</button></li>
      </div>
    )
  }
  return (
    countries.map(toList)
  )
  }

const List = ({ countries, clickHandler, country, chosen, weather}) => {
  return (countries.length > 10?
    <p>Too many matches, specify another filter</p>
  :countries.length === 0?
  <p>No countries containing that string</p>
  :countries.length > 1 && chosen === false?
  <MultipleCountryList countries={countries} clickHandler={clickHandler} />
  : country != null?
  <CountryDetails country={country} weather={weather} />
  : 'nothing'
  )
}

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [ countries,setCountries ] = useState([])
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState([])
  const [chosen, setChosen] = useState(false)
  const [weather, setWeather] = useState([])
  const [capitalCity, setCapitalCity] = useState('Oslo')

  
  const clickHandler = (name) => () => {
    setCountry(name)
    setCapitalCity(name.capital)
    setChosen(true)
  }
  useEffect(() => {
    axios
    .get('http://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  },[])

  useEffect(() => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capitalCity}`)
    .then(response => {
      setWeather(response.data)
    })
  },[country])

  const filterChange = (event) => {
    setChosen(false)
    setFilter(event.target.value)
  }

  const countriesShown = countries.filter(country => 
    country.name.toLowerCase().includes(filter.toLowerCase()))
    
    if (countriesShown.length === 1 && chosen === false) {
      setCountry(countriesShown[0])
      setCapitalCity(countriesShown[0].capital)
      setChosen(true)
    }

    console.log(weather);
  return (
    <div>
      find countries <input value={filter} onChange={filterChange}  />
      <List countries={countriesShown} clickHandler={clickHandler} country={country} chosen={chosen} weather={weather}/>
    </div>
  )
}


export default App;
