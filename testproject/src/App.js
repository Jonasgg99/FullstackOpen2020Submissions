import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  
  const [notes, setNotes] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')

  // ...
  return (
      <div>
  {console.log('inside return statement')}
  {notes.map(note=><li key={note.id}>{note.content}</li>)}
  </div>
  )}

export default App;
