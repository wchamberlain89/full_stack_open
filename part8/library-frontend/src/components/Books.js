import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const Books = (props) => {
  const query = useQuery(ALL_BOOKS)
  const [books, setBooks] = React.useState([])
  console.log(books)
  
  useEffect(() => {
    if (query.data) {
      console.log('fetching books')
      setBooks(query.data.allBooks)
    }
  }, [query])
  
  if (!props.show) {
    return null
  }

  if(query.loading) {
    return <h1>loading...</h1>
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books && books.map(book => {
            {console.log(book.author)}
            return <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author && book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books