import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const requestRef = useRef(0)

  const fetchCountryData = async () => {
    if (!name) {
      return
    }

    try {
      requestRef.current += 1
      const requestNumber = requestRef.current
      const { error, data } = await axios.get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
      )

      if (error) {
        setCountry({ found: false })
        return
      }

      if (requestNumber === requestRef.current)
        setCountry({
          data: {
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png,
          },
          found: true,
        })
    } catch (error) {
      setCountry({ found: false })
    }
  }

  useEffect(() => {
    fetchCountryData()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  console.log({ country })

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
