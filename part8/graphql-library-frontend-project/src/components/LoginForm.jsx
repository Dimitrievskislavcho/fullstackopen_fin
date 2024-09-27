import { useState } from 'react'

// eslint-disable-next-line react/prop-types
const LoginForm = ({ login, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }

  // eslint-disable-next-line react/prop-types
  if (!show) {
    return null
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <div
        className='controls-wrapper'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor='username'>
          username
          <input
            required={true}
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor='password'>
          password
          <input
            type='password'
            required={true}
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>

      <button type='submit'>log in</button>
    </form>
  )
}

export default LoginForm
