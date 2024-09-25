import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div data-testid='title-and-author'>
      <Link to={`blogs/${blog.id}`}>
        {blog.title} {blog.author}{' '}
      </Link>
    </div>
  )
}

export default Blog
