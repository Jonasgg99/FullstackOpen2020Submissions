import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  author {name}
  published
  genres
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($genre:String){
  allBooks(genre:$genre)  {
    title
    author {name}
    published
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title:String!, $author:String!, $published:Int!, $genres:[String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres 
  ) {
    title
    author{name}
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthorBirth($name:String!, $year:Int!) {
  editAuthor(
    name: $name,
    setBornTo: $year
  ) {
    name
    born
  }
}`

export const LOG_IN = gql`
mutation login($username:String!, $password:String!) {
  login(
    username: $username,
    password: $password
  ) { value }
}
`

export const CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}

${BOOK_DETAILS}
`