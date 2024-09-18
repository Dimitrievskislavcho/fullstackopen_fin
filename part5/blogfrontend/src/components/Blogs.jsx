import { forwardRef } from 'react'
import { getUserFromStorage } from '../services/login'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Toggleable'
import PropTypes from 'prop-types'

const Blogs = forwardRef(
  (
    { data, children, logoutButton, onCreateBlog, onBlogLike, onBlogDelete },
    ref
  ) => {
    const { name: loggedUserName } = getUserFromStorage() || {}

    return (
      <div>
        <h2>blogs</h2>
        <p>
          {loggedUserName} logged in {logoutButton}
        </p>

        {children}

        <Togglable ref={ref} buttonLabel='new blog'>
          <BlogForm onCreateBlog={onCreateBlog}></BlogForm>
        </Togglable>

        {data.map((blog) => (
          <Blog
            onBlogLike={onBlogLike}
            onBlogDelete={onBlogDelete}
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    )
  }
)

Blogs.displayName = 'Blogs'

Blogs.propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  logoutButton: PropTypes.node.isRequired,
  onCreateBlog: PropTypes.func.isRequired,
  onBlogLike: PropTypes.func.isRequired,
  onBlogDelete: PropTypes.func.isRequired,
}

export default Blogs
