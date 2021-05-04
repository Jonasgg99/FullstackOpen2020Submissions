const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'onefelloverthemoon876329'

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String
    born: Int
    bookCount: Int!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre:String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    me: (root,args,context) => {
      return context.currentUser
    },
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(b => b.author === args.author)
                    .filter(b => b.genres.includes(args.genre))
      } else if (args.author) {
        return books.filter(b => b.author === args.author)
      } else if (args.genre) {
        const bookList = Book.find( {genres: { $in: args.genre }})
        return bookList.populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: () => Author.find()
  },
  Author: {
    bookCount: (root) => {
      return Book.countDocuments({author:root})
    }
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Missing token")
      }
      if (args.title.length < 2) throw new UserInputError('Title too short')
      if (args.author.length < 4) throw new UserInputError('Author name too short')

      const book = await Book.findOne({title:args.title})
      if (book) {
        throw new UserInputError('Book already exists', {
          invalidArgs: args.title,
        })
      }
      let author = await Author.findOne({name:args.author})
      if (!author) {
        author = new Author({ name: args.author })
        author.save()
      }
      const newBook = new Book({...args, author:author})

      return newBook.save()
    },
    editAuthor: (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Missing token")
      }
      return Author.findOneAndUpdate({name:args.name}, {born:args.setBornTo}, {new:true})
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})