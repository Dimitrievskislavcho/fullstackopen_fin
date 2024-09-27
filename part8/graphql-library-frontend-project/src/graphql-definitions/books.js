import { gql } from '@apollo/client'

const BOOK_DETAILS_FRAGMENT = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const BOOKS_BY_GENRE = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`

export const ADD_BOOK = gql`
  mutation (
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`

export const NEW_BOOKS_SUB = gql`
  subscription BooksFeed {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`
