const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

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
  input editAuthorParams {
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
    editAuthor(name: String!, params: editAuthorParams): Author
  }
`

const resolvers = {
  Query: {
    allBooks: (root, args) => {
      const { author } = args
      const { genre } = args
      console.log('getting books')
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
      const book = { ...args, id: uuid() }
      console.log('Adding book', book)
      
      books = books.concat(book)
      
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