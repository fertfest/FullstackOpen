import { useEffect, useState } from 'react'
import axios from 'axios'

function Detail({ country }) {
  const langs = []
  for (const l in country.languages) {
    langs.push(country.languages[l])
  }
  return <>
    <h1>
      {country.name.common}
    </h1>
    <p>
      capital {country.capital}
    </p>
    <p>
      area {country.area}
    </p>
    <br />
    <p>
      <b>languages:</b>
    </p>
    <ul>
      {langs.map((lang, i) => <li key={i}>{lang}</li>)}
    </ul>
    <img src={country.flags.png} />
  </>
}

function Data({ filtered, count, handleClick }) {
  if (count > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (count > 1) {
    console.log(filtered);
    return filtered.map((country, index) =>
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={handleClick(index)}>{country.showed ? "hide" : "show"}</button>
        {country.showed ? <Detail country={country} /> : <></>}
      </div>
    )
  } else if (count == 1) {
    const country = filtered[0]
    return <Detail country={country} />
  } else {
    return <></>
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searched, setSearched] = useState('')

  const handleClick = index => () => {
    setFiltered(filtered.map((country, i) => index === i ? { ...country, showed: !country.showed } : country))
  }

  const handleChange = e => {
    setSearched(e.target.value)
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)

    setFiltered(filteredCountries.map(country => {
      return {
        ...country,
        showed: false
      }
    }
    ))

    setCount(filteredCountries.length)
    console.log(filteredCountries.length);
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(resp => {
        setCountries(resp.data)
        setCount(resp.data.length)
      })
  }, [])

  return (
    <>
      <div>
        find countries <input value={searched} onChange={handleChange} />
      </div>
      <Data filtered={filtered} count={count} handleClick={handleClick} />
    </>
  )
}

export default App
