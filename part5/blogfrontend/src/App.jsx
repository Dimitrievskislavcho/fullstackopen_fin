import { useEffect, useRef, useContext, useCallback, forwardRef } from 'react'
import LoginForm from './components/LoginForm'
import { login, logout } from './services/login'
import Blogs from './components/Blogs'
import { getAll as getAllUsers } from './services/users'
import { getAll } from './services/blogs'
import Notification from './components/Notification'
import AppContext from './AppContext'
import { useQuery } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import { Button } from 'react-bootstrap'

const App = () => {
  // user being set as an empty object fixes the flashing problem on refresh aka
  // neithger Blogs or LoginForm should be shown
  const {
    state: { notification },
    dispatch,
  } = useContext(AppContext)
  const togglableSection = useRef()
  const setNotification = useCallback(
    (notification = '') => {
      dispatch({ type: 'SET_NOTIFICATION', payload: notification })
    },
    [dispatch]
  )

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await login({
        username,
        password,
      })
      dispatch({ type: 'SET_USER', payload: user })
      setNotification(null)
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })

      return false
    }

    return true
  }

  const handleLogout = () => {
    logout()
    dispatch({ type: 'SET_USER', payload: null })
    setNotification(null)
  }

  const { data: users } = useQuery({
    initialData: [],
    queryKey: ['users'],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const { data } = useQuery({
    initialData: [],
    queryFn: getAll,
    queryKey: ['blogs'],
    retry: false,
    refetchOnWindowFocus: false,
  })
  const blogs = data.sort((first, second) => {
    return second.likes - first.likes
  })

  useEffect(() => {
    let timeoutId

    if (notification) {
      timeoutId = setTimeout(() => setNotification(null), 5000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification, setNotification])

  const projectNotification = () =>
    notification ? <Notification data={notification} /> : ''

  return (
    <div className='container'>
      <Routes>
        <Route
          path='/'
          element={
            <Blogs
              logoutButton={
                <Button onClick={handleLogout} variant='secondary'>
                  logout
                </Button>
              }
            >
              {projectNotification()}
            </Blogs>
          }
        >
          <Route
            index
            element={<BlogList data={blogs} ref={togglableSection}></BlogList>}
          ></Route>
          <Route
            path='blogs/:id'
            element={<BlogDetails blogs={blogs}></BlogDetails>}
          />
          <Route path='users' element={<Users users={users} />}></Route>
          <Route
            path='users/:id'
            element={<UserDetails users={users} />}
          ></Route>
        </Route>
        <Route
          path='/login'
          element={
            <LoginForm handleLogin={handleLogin}>
              {projectNotification()}
            </LoginForm>
          }
        />
      </Routes>
    </div>
  )
}

export default App
