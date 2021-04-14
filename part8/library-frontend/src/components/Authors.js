  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const ChangeBirthYear = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [birthYear, setBirthYear] = useState('')

  const authorList = authors.data.allAuthors

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  let options = []
  authorList.forEach(author => {
    options = [...options, {value:author.name, label:author.name}]
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor( {variables: { name: selectedAuthor.value, year: parseInt(birthYear) } })

    setSelectedAuthor(null)
    setBirthYear('')
  }

  return (
    <div>
  <h2>Set birthyear</h2>
      <form onSubmit= { submit }>
        <Select 
          defaultValue={selectedAuthor} 
          onChange={setSelectedAuthor} 
          options={options}/>
            <div>
              born
              <input
                value={birthYear}
                onChange={({target}) => setBirthYear(target.value)}>
              </input>
            </div>
            <button type="submit">update author</button>
      </form>
      </div>
  )

}

const Authors = (props) => {

  if (!props.show) {
    return null
  }

  if (props.authors.loading) {
    return <div>loading...</div>
  }

  const authors = props.authors.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <ChangeBirthYear authors={props.authors} />
    </div>
  )
}

export default Authors
