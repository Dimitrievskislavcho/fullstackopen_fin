import { forwardRef, useContext, useEffect } from 'react'
import { getUserFromStorage } from '../services/login'
import PropTypes from 'prop-types'
import AppContext from '../AppContext'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Blogs = ({ children, logoutButton }) => {
  const { name: loggedUserName } = getUserFromStorage() || {}
  const {
    state: { user },
  } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    !user && navigate('/login')
  }, [navigate, user])

  if (!user) return null

  return (
    <div>
      <Navbar expand='md' className='bg-body-tertiary' data-bs-theme='dark'>
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <Nav.Link href='/'>blogs</Nav.Link>
              <Nav.Link href='/users'>users</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>{loggedUserName} logged in </Navbar.Text>
            <Navbar.Text>{logoutButton}</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <h2>blog app</h2>
      <p></p>

      {children}
      <Outlet />
    </div>
  )
}

Blogs.displayName = 'Blogs'

Blogs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  logoutButton: PropTypes.node.isRequired,
}

export default Blogs
