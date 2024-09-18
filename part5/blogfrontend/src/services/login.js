import axios from 'axios'

const baseUrl = '/api/login'
let token = null

const getAuthorizationHeader = () => (token ? `Bearer ${token}` : null)

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  token = response.data.token
  window.localStorage.setItem('loggedUser', JSON.stringify(response.data))
  return response.data
}

const logout = () => {
  window.localStorage.removeItem('loggedUser')
}

const getUserFromStorage = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }
  return null
}

export { login, logout, getAuthorizationHeader, getUserFromStorage }
