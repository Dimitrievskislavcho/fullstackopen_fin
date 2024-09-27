/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_GENRES, BOOKS_BY_GENRE } from '../graphql-definitions/books'
import { useEffect, useState } from 'react'
import BooksTable from './BooksTable'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('all genres')
  const { data: { allBooks = [] } = {}, refetch } = useQuery(BOOKS_BY_GENRE, {
    skip: !props.show,
    variables: {
      genre: selectedGenre === 'all genres' ? undefined : selectedGenre,
    },
  })
  const { data: { allGenres: genres = [] } = {} } = useQuery(ALL_GENRES, {
    skip: !props.show,
  })

  useEffect(() => {
    refetch({
      genre: selectedGenre === 'all genres' ? undefined : selectedGenre,
    })
  }, [selectedGenre, refetch])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{selectedGenre}</strong>
      </p>

      <BooksTable books={allBooks}></BooksTable>

      {genres.map((genre, index) => (
        <button
          onClick={() => setSelectedGenre(genre)}
          style={
            selectedGenre === genre
              ? { backgroundColor: 'green', color: 'white' }
              : {}
          }
          key={index}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
