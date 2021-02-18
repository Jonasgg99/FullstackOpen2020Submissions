import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(note => 
      note.content
        .toLowerCase()
        .includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote))
    dispatch(notificationChange(`you voted for '${anecdote.content.split(' ',3).join(' ')} ...'`, 5))
  }

  anecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <div>{anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}</div>
  )
}

export default AnecdoteList