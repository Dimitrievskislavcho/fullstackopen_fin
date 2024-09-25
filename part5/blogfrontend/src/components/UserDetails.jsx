import { useQueryClient } from '@tanstack/react-query'
import { ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const UserDetails = ({ users }) => {
  const params = useParams()
  const user = users.find((user) => user.id === params.id)

  if (!user) return

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map((blog, index) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default UserDetails
