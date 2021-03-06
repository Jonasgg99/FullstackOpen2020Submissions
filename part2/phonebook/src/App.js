import React, { useState, useEffect } from 'react'
import service from './services/phonebook'

const Persons = ({ persons, deleter, filteredList }) => {

    return (
    <ul>
    {filteredList.map((person => <li key={person.name} >{person.name} {person.number}
    <button onClick={() => deleter(person)}>delete</button></li>))}
    </ul>
    )}

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

const Notification = ({ message }) => {

  if (message === null) {
    return null
  }
  console.log(message.error);
  const notificationStyle = {
    color: message.error? 'red' : 'green',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'gainsboro',
    border: message.error? '3px solid red' : '3px solid green',
    borderRadius: '5px',
    padding: '15px'
  }


  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage,setErrorMessage] = useState(null)

  const hook = () => {
    service.getAll().then(data => {
      setPersons(data)
    })
  }
  useEffect(hook, [])

  const includesName = name => persons.find(person => person.name.toLowerCase() === name.toLowerCase())

  const deleter = (person) => {
    console.log(person.id)
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log('deleting ' + person.name)
      service.deleter(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const addNew = (event) => {
    event.preventDefault()
    const newPerson = {name:newName, number:newNumber}
    if (includesName(newName)) {
    if (window.confirm(`${newName} is already added to phonebook
    :). Replace number?`)) {
      service.updateNumber(newPerson,persons).then(returnedPerson =>
        setPersons(persons.map(person => person.id !== returnedPerson.id?
          person
          :returnedPerson )))
          .then(setNewName(''))
          .then(setNewNumber(''))
          .then(setErrorMessage({text:`Updated ${newPerson.name}`, error:false}))
          .catch(error => {
            if (error.response.data.error === "Validation failed: name: Cannot read property 'ownerDocument' of null") {
              setErrorMessage({text:`${newPerson.name} already deleted from server. Updating list...`, error:true})
              const personToRemove = persons.find(n=>n.name.toLowerCase() === newPerson.name.toLowerCase())
              setPersons(persons.filter(person => person.id !== personToRemove.id))
              return
            }
            setErrorMessage({text:`${error.response.data.error}`, error:true})
            
            
          })
      .then(setTimeout(() => {
        setErrorMessage(null)
      },5000))
      
          
    } else {
      window.alert('person not replaced')
    }
    } else {
      service.uploadNew(newPerson).then(data => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNumber('')
      })
      .then(setErrorMessage({text:`Added ${newPerson.name}`, error:false}))
      .then(setTimeout(() => {
        setErrorMessage(null)
      },5000))
      .catch(error => {
        setErrorMessage({text:`Error: ${error.response.data.error}`, error:true})
      })
      
    }
  }

  //const filtered = persons.filter(person => 
   // person.name.toLowerCase().includes(filter.toLowerCase())) 

  const handleChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const filterChange = (event) => {
    setFilter(event.target.value)
  }
  console.log('filteredlist'+persons)

  const filteredList = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
<br/>
      <PersonFilter filter={filter} handling={filterChange}/>
    
      <h3>Add new</h3>

      <PersonForm addNew={addNew} newName={newName} newNumber={newNumber}
      handleChange={handleChange} handleNumberChange={handleNumberChange} /> 
      
      <h2>Numbers</h2>
      <Persons persons={persons} deleter={deleter} filteredList={filteredList}/>
    </div>
  )
}


export default App