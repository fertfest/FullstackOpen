import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searched, setSearched] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const filteredPersons = persons.filter(person => person.name.toLowerCase().indexOf(searched.toLowerCase()) !== -1)

  const handleChangeName = event => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = event => {
    setNewNumber(event.target.value)
  }

  const handleChangeSearched = event => {
    setSearched(event.target.value)
  }

  const addPerson = event => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      const confirmMessage = newName +
        ' is already added to the phonebook,' +
        ' replace the old number with a new one?'

      if (confirm(confirmMessage)) {
        const person = {
          ...persons.find(p => p.name === newName),
          number: newNumber
        }

        personService
          .changeNumber(person)
          .then(resp => {
            setPersons(persons.map(p => p.id !== person.id ? p : { ...p, number: newNumber }))
            setIsError(false)
            setMessage(`Updated ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          }).catch(() => {
            setPersons(persons.filter(p => p.id !== person.id))
            setIsError(true)
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
      }
    } else {
      personService
        .addOne({ name: newName, number: newNumber })
        .then(resp => {
          setPersons([...persons, resp])
          setNewNumber("")
          setNewName("")
        })

      setIsError(false)
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const deletePerson = (id, name) => {
    return () => {
      if (confirm(`Delete ${name} ?`)) {
        personService
          .deletePerson(id)
          .then(resp => {
            setPersons(persons.filter(person => person.id != id))
          })
      }
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(resp => setPersons(resp))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter searched={searched} handleChangeSearched={handleChangeSearched} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName} handleChangeName={handleChangeName}
        newNumber={newNumber} handleChangeNumber={handleChangeNumber}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App