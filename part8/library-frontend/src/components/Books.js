import React, { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      title,
      author,
      published
    }
  }
`

const Books = (props) => {
  const query = useQuery(ALL_BOOKS)
  const [books, setBooks] = React.useState([])
  
  useEffect(() => {
    if (query.data) {
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books