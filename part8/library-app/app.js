require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const db = require('./db')
const Book = require('./models/book')
const Author = require('./models/author')

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author
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
    findBook(title: String!): Book
    bookCount: Int!
    authorCount: Int!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]): Book
    editAuthor(id: ID!, params: EditAuthorParams): Author
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const { author } = args
      const { genre } = args
      console.log('getting books')
      const books = await Book.find({}).populate('author')
      console.log(books)
      if(author) {
        return books.filter(book => book.author === author)
      }

      if(genre) {
        return books.filter(book => book.genres.includes(genre))
      }

      return books
    },
    allAuthors: () => Author.find({}),
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    findBook: async (root, args) => {
      const foundBook = await Book.find({ title: args.title }).populate('author')
      return foundBook[0]
    }
  },
  Mutation: {
    addBook: async (root, { author, title, published, genres }) => {    
      const book = new Book({ title: title, published: published, genres: genres })
      
      let newAuthor = await Author.find({ name : author })
      
      if(newAuthor.length > 0) {
        book.author = newAuthor[0]._id
      } else {
        newAuthor = new Author({ name: author })
        await newAuthor.save()
        book.author = newAuthor._id
      }

      const savedBook = await book.save()
      return await Book.populate(savedBook, { path: 'author' })
    },
    editAuthor: async (root, args) => updatedBlog = await Author.findByIdAndUpdate(args.id, { ...args.params }, { new: true })
  },
  Author: {
    bookCount: (root) => {  
      const book = Book.find({ author: { id : root.id } })
      console.log(book)
      books.filter(book => book.author === root.name).length || 0
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})