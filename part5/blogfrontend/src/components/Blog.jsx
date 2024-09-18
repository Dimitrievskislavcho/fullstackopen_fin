import { useState } from 'react'
import { getUserFromStorage } from '../services/login'

const Blog = ({ blog, onBlogLike, onBlogDelete }) => {
  const [showDetails, setShowDetails] = useState()
  const [isLikeButtonDisabled, setIsLikeButtonDisabled] = useState(false)
  const { name: currentlyLoggedUserName } = getUserFromStorage() || {}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeTheBlog = async () => {
    setIsLikeButtonDisabled(true)
    await onBlogLike(blog)
    setIsLikeButtonDisabled(false)
  }

  const deleteTheBlog = () => {
    const doDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author || 'Unknown author'}`
    )

    if (doDelete) {
      onBlogDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div data-testid='title-and-author'>
        {blog.title} {blog.author}{' '}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'show'}
        </button>
      </div>
      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <button disabled={isLikeButtonDisabled} onClick={likeTheBlog}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.name === currentlyLoggedUserName && (
            <button onClick={deleteTheBlog}>delete</button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
