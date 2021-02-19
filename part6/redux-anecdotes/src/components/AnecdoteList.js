import React from 'react'
import { voteFor } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
//import { useDispatch, useSelector } from 'react-redux'//
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  /* useSelector
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(note => 
      note.content
        .toLowerCase()
        .includes(state.filter.toLowerCase()))
  })
  const dispatch = useDispatch()*/

  const vote = (anecdote) => {
    props.voteFor(anecdote)
    props.notificationChange(`you voted for '${anecdote.content.split(' ',3).join(' ')} ...'`, 5)
    /*
    dispatch(voteFor(anecdote))
    dispatch(notificationChange(`you voted for '${anecdote.content.split(' ',3).join(' ')} ...'`, 5))
    */
  }

  props.anecdotes.sort((a,b) => b.votes - a.votes)

  return (
    <div>{props.anecdotes.map(anecdote =>
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

const mapDispatchToProps = {
  voteFor, notificationChange
}

const mapStateToProps = (state) => {
  if ( state.filter === '' ) {
    return { anecdotes: state.anecdotes }
  }
  return { anecdotes:
      state.anecdotes.filter(note => 
      note.content
        .toLowerCase()
        .includes(state.filter.toLowerCase()))
      }
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedNotes
/*export default AnecdoteList*/