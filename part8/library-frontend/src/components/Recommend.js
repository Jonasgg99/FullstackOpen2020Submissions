import React from 'react'

const Recommend = ({ books, user, show }) => {

  if (!show) return null

  const favoriteGenre = user.data.me.favoriteGenre
  
  const booksToShow = books.data.allBooks.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommended reading</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
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
    </div>
  )
}

export default Recommend