import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import { getUserFromStorage, login, logout } from './services/login'
import Blogs from './components/Blogs'
import { createBlog, deleteBlog, getAll, likeBlog } from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // user being set as an empty object fixes the flashing problem on refresh aka
  // neithger Blogs or LoginForm should be shown
  const [user, setUser] = useState({})
  const [notification, setNotification] = useState(null)
  const togglableSection = useRef()

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await login({
        username,
        password,
      })
      setUser(user)
      setNotification(null)
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })

      return false
    }

    return true
  }

  const handleBlogCreation = async (blogData) => {
    try {
      const blog = await createBlog(blogData)
      setBlogs([...blogs, blog])
      setNotification({
        message: `a new blog ${blog.title}! by ${
          blog.author ? blog.author : 'Unknown authhor'
        } added`,
        type: 'success',
      })
      togglableSection.current.toggleVisibility()
      return blog
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const handleBlogLike = async (blogData) => {
    try {
      const response = await likeBlog(blogData)

      if (response.acknowledged) {
        setBlogs(
          blogs.map((blog) =>
            blog.id === blogData.id ? { ...blog, likes: blog.likes + 1 } : blog
          )
        )
      }

      return true
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setNotification(null)
  }

  const handleBlogDeletion = async (blogId) => {
    try {
      await deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (error) {
      setNotification({ message: error.message, type: 'error' })
    }
  }

  useEffect(() => {
    getAll().then((blogs) => {
      setBlogs(
        blogs.sort((first, second) => {
          return second.likes - first.likes
        })
      )
    })
  }, [])

  useEffect(() => {
    setUser(getUserFromStorage())
  }, [])

  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(null), 5000)
    }
  }, [notification])

  const projectNotification = () =>
    notification ? <Notification data={notification} /> : ''

  return (
    <>
      {user && user.token && (
        <Blogs
          ref={togglableSection}
          data={blogs}
          logoutButton={<button onClick={handleLogout}>logout</button>}
          onBlogLike={handleBlogLike}
          onBlogDelete={handleBlogDeletion}
          onCreateBlog={handleBlogCreation}
        >
          {projectNotification()}
        </Blogs>
      )}
      {!user && (
        <LoginForm handleLogin={handleLogin}>{projectNotification()}</LoginForm>
      )}
    </>
  )
}

export default App
