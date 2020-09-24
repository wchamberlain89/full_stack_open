require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const db = require('./db')
const Book = require('./models/book')

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  input EditAuthorParams {
    name: String
    born: Int
  }
  type Query {
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]): Book
    editAuthor(name: String!, params: EditAuthorParams): Author
  }
`

const resolvers = {
  Query: {
    allBooks: (root, args) => {
      const { author } = args
      const { genre } = args
      console.log('getting books')
      const books = Book.find({})
      console.log('books are ', books)
      if(author) {
        return books.filter(book => book.author === author)
      }

      if(genre) {
        return books.filter(book => book.genres.includes(genre))
      }

      return books
    },
    allAuthors: () => authors,
    bookCount: () => books.length,
    authorCount: () => authors.length
  },
  Mutation: {
    addBook: (root, args) => {
      console.log('Adding book')
      const book = new Book({ ...args })
      console.log('Adding book', book)
      book.save()
      
      const isNewAuthor = !authors.find(author => author.name === book.author)

      if(isNewAuthor) {
        authors = authors.concat({ name: book.author, id: uuid() })
      }

      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name)
      return author ? { ...author, ...args.params } : null
    }
  },
  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length || 0
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})