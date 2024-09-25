import { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import AppContext from '../AppContext'
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ handleLogin, children }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {
    state: { user },
  } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.token) {
      navigate('/')
    }
  }, [navigate, user])

  if (user) return null

  return (
    <>
      <h2>log in to application</h2>
      {children}
      <Form
        onSubmit={async (event) => {
          event.preventDefault()
          const shouldResetForm = await handleLogin({ username, password })
          if (shouldResetForm) {
            setUsername('')
            setPassword('')
          }
        }}
      >
        <Form.Group className='mb-3'>
          <Form.Label>username</Form.Label>
          <Form.Control
            placeholder='Type your username here...'
            type='text'
            data-testid='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>password</Form.Label>
          <Form.Control
            placeholder='Type your password here...'
            type='password'
            data-testid='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          login
        </Button>
      </Form>
    </>
  )
}

export default LoginForm
