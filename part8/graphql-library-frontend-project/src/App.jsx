import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useApolloClient, useMutation, useSubscription } from '@apollo/client'
import { USER_LOGIN } from './graphql-definitions/login'
import LoginForm from './components/LoginForm'
import BooksForUser from './components/BooksForUser'
import { BOOKS_BY_GENRE, NEW_BOOKS_SUB } from './graphql-definitions/books'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('user-token'))
  const [login] = useMutation(USER_LOGIN, {
    onCompleted: (...args) => {
      console.log({ logDescription: 'on login completed args', args })
    },
  })
  const client = useApolloClient()

  const handleLogin = async (variables) => {
    console.log(variables)
    const response = await login({ variables })
    setToken(response.data.login.value)
    localStorage.setItem('user-token', response.data.login.value)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('user-token')
    client.clearStore()
    if (['add', 'recommend'].includes(page)) {
      setPage('login')
    }
  }

  useSubscription(NEW_BOOKS_SUB, {
    onData: ({ data, client }) => {
      if (data?.data?.bookAdded) {
        client.cache.updateQuery({ query: BOOKS_BY_GENRE }, ({ allBooks }) => {
          console.log(data?.data?.bookAdded, allBooks)
          return {
            allBooks: allBooks.concat(data?.data?.bookAdded),
          }
        })
      }
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>log in</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <BooksForUser show={page === 'recommend'} />

      <LoginForm show={page === 'login'} login={handleLogin}></LoginForm>
    </div>
  )
}

export default App
