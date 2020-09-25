require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const db = require('./db')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')


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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]): Book
    editAuthor(id: ID!, params: EditAuthorParams): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const { author } = args
      const { genre } = args

      const books = await Book.find({}).populate('author')

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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    createUser: (root, args) => {
      let user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        user = user.save()
      } catch(error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'bone') {
        throw new UserInputError('Username or password is incorrect')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async (root, { author, title, published, genres }, context) => {
      if(!context.currentUser) {
        throw new AuthenticationError("You need to be logged in to perform this action")
      }

      const book = new Book({ title: title, published: published, genres: genres })
      
      let newAuthor = await Author.find({ name : author })
      
      if(newAuthor.length > 0) {
        book.author = newAuthor[0]._id
      } else {
        newAuthor = new Author({ name: author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: { author, title, published, genres }
          })
        }

        book.author = newAuthor._id
      }
      try {
        const savedBook = await book.save()
        return await Book.populate(savedBook, { path: 'author' })
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: { author, title, published, genres }
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(args.id, { ...args.params }, { new: true, runValidators: true })
        return updatedAuthor
      } catch(error) {
        throw new UserInputError(error, {
          invalidArgs: args
        })
      }
    }
  }
  ,
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({ author: root.id })
      return result.length
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
        auth.substring(7), process.env.JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id) 
      return { currentUser }
    }
  },
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})