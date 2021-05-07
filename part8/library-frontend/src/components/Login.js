import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { LOG_IN } from '../queries'

const Login = ({ show, setToken, setPage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOG_IN)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('part8-user-token', token)
      setUsername('')
      setPassword('')
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!show) return null

  

  const submit = async (event) => {
    event.preventDefault()
    
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={submit}>
      <div>
        username
        <input
          value={username}
          onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input
          value={password}
          onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type="submit">log in</button>
    </form>
  )
}

export default Login