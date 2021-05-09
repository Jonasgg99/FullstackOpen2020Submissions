
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_AUTHORS, CURRENT_USER } from './queries'


const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(CURRENT_USER)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (page === 'add') setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token?
          <button onClick={() => setPage('add')}>add book</button>
          :
          <button onClick={() => setPage('login')}>login</button>
        }
        {token?
          <button onClick={() => setPage('recommend')}>recommend</button>
          :
          null
        }
        {token?
          <button onClick={logout}>log out</button>
          :
          null
          }
      </div>

      <Authors
        authors = {authors}
        show={page === 'authors'}
      />
      {books.loading? null :
      <Books
        books = {books}
        show={page === 'books'}
      />
      }
      <NewBook
        show={page === 'add'}
      />

      <Recommend
        books = {books}
        user = {user}
        show={page === 'recommend'}
      />
      
      <Login 
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App