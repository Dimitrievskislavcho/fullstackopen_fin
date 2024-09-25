import { useQueryClient } from '@tanstack/react-query'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <Table size='sm' striped>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`${user.id}`}>{user.name}</Link>
              </td>
              <td>{user?.blogs?.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users
