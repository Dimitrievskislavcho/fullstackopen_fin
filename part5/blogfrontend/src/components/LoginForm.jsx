import { useState } from 'react'

const LoginForm = ({ handleLogin, children }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      <h2>log in to application</h2>
      {children}
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          const shouldResetForm = await handleLogin({ username, password })
          if (shouldResetForm) {
            setUsername('')
            setPassword('')
          }
        }}
      >
        <div>
          username
          <input
            type='text'
            data-testid='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            data-testid='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
