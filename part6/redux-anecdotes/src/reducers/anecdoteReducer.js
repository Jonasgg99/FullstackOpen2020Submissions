/*const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/
import anecdoteService from '../services/anecdotes'

export const voteFor = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
  })
  }
}


export const add = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const changedAnecdote = action.data
      
      return state.map(n =>
        n.id !== id ? n : changedAnecdote
      )
    case 'ADD':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer