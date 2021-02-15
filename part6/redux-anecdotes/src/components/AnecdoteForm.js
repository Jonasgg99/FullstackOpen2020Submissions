import React from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    dispatch(add(content))
  }

  return (
        <form onSubmit={addAnecdote}>
          <h2>create new</h2>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
  )
}

export default AnecdoteForm