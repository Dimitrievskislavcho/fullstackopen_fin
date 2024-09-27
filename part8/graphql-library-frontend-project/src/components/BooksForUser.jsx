/* eslint-disable react/prop-types */
import { gql, useQuery } from '@apollo/client'
import BooksTable from './BooksTable'
import { BOOKS_BY_GENRE } from '../graphql-definitions/books'
import { useEffect } from 'react'

// eslint-disable-next-line react/prop-types
const BooksForUser = (props) => {
  const { data } = useQuery(
    gql`
      query {
        me {
          favoriteGenre
        }
      }
    `,
    {
      skip: !props.show,
    }
  )
  const {
    data: { allBooks = [] } = {},
    loading,
    refetch,
  } = useQuery(BOOKS_BY_GENRE, {
    skip: !props.show,
    variables: { genre: data?.me?.favoriteGenre },
  })

  useEffect(() => {
    if (props.show && !loading) {
      refetch({ genre: data?.me?.favoriteGenre })
    }
  }, [props.show, data?.me?.favoriteGenre, refetch, loading])

  if (!props.show) {
    return null
  }

  console.log(allBooks)

  return (
    <div>
      <p>
        books in your favorite genre <strong>{data?.me?.favoriteGenre}</strong>
      </p>

      {allBooks.length ? <BooksTable books={allBooks}></BooksTable> : ''}
    </div>
  )
}

export default BooksForUser
