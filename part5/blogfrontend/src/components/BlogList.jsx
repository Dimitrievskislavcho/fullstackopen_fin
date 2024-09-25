import { forwardRef } from 'react'
import Togglable from './Toggleable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { ListGroup } from 'react-bootstrap'

const BlogList = forwardRef(function blogContent({ data }, ref) {
  return (
    <>
      <Togglable ref={ref} buttonLabel='new blog'>
        <BlogForm></BlogForm>
      </Togglable>

      <ListGroup>
        {data.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Blog blog={blog} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
})

export default BlogList
