import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client';

const Books = (props) => {
  const [selectedGenre, setGenre] = useState(null)
  const [getBooksByGenre, result] = useLazyQuery(ALL_BOOKS)

  let booksToShow = []
  useEffect(() => {
    if ( result.data ) {
      console.log(result.data);
      booksToShow = result.data
    } 
  }, [result.data]) // eslint-disable-line
  
  if (!props.show) {
    return null
  }
  
  if (props.books.loading) {
    return <div>loading...</div>
  }

  const books = props.books.data.allBooks

  let genres = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.includes(genre)) {
        genres = [...genres, genre]
      }
    })
  })
  console.log('genres');

  if (!selectedGenre) booksToShow = books

  //const booksToShow = selectedGenre? books.filter(book => book.genres.includes(selectedGenre)) : books

  return (
    <div>
      <h2>books</h2>
      {selectedGenre? <p>in {selectedGenre} genre</p> : null}
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(genre => 
        <button key={genre} onClick={({}) => getBooksByGenre({ variables: {genre}})}>{genre}</button>)}
    </div>
  )
}

export default Books