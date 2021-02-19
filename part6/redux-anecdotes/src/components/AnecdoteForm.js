import React from 'react'
//import { useDispatch } from 'react-redux'//
import { add } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()//

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    props.add(content)
    props.notificationChange(`you created '${content}'`, 5)
    /*dispatch(add(content))
    dispatch(notificationChange(`you created '${content}'`, 5))*/
  }

  return (
        <form onSubmit={addAnecdote}>
          <h2>create new</h2>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
  )
}
export default connect(
  null,
  { add, notificationChange }
)(AnecdoteForm)

//export default AnecdoteForm//