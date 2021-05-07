import { gql  } from '@apollo/client'

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
query {
  allBooks  {
    title
    author {name}
    published
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