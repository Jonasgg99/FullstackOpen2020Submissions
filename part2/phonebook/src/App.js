import React, { useState } from 'react'

const Persons = ({ persons }) => 
    <ul>
    {persons.map((person => <li key={person.name} >{person.name} {person.number}</li>))}
    </ul>

const PersonFilter = ({ filter, handling }) => 
  <div>
    Filter: <input value={filter} onChange={handling} />
  </div>
  
const PersonForm = ({ addNew, newName, newNumber, handleChange, handleNumberChange }) => {
  return (
        <form onSubmit={addNew}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const includesName = name => {
    if (persons.map(person => person.name).includes(name)) {
      return true
    }
    return false
  }

  const addNew = (event) => {
    event.preventDefault()
    includesName(newName) ?
    window.alert(`${newName} is already added to phonebook
    :)`)
    : setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
  }

  const filtered = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())) 

  const handleChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const filterChange = (event) => {
    setFilter(event.target.value)
  }
  console.log('filtered',filtered);
  return (
    <div>
      <h2>Phonebook</h2>

      <PersonFilter filter={filter} handling={filterChange}/>

      <h3>Add new</h3>

      <PersonForm addNew={addNew} newName={newName} newNumber={newNumber}
      handleChange={handleChange} handleNumberChange={handleNumberChange} /> 
      
      <h2>Numbers</h2>
      <Persons persons={filtered} />
    </div>
  )
}

export default App