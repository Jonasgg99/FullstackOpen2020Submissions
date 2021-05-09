import React, { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setGenre] = useState(null)
  
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

  const booksToShow = selectedGenre? books.filter(book => book.genres.includes(selectedGenre)) : books

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
        <button key={genre} onClick={({}) => setGenre(genre)}>{genre}</button>)}
    </div>
  )
}

export default Books