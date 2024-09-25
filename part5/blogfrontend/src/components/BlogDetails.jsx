import { useCallback, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeBlog, addBlogComment } from '../services/blogs'
import AppContext from '../AppContext'
import { Button, ListGroup, Form, InputGroup } from 'react-bootstrap'

const BlogDetails = ({ blogs }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const params = useParams()
  const blog = blogs.find((blog) => blog.id === params.id)
  const [isMutationHappening, setIsMutationHappening] = useState(false)
  const { dispatch } = useContext(AppContext)

  const onMutationSuccess = (response) => {
    if (response.acknowledged) {
      queryClient.invalidateQueries({
        queryKey: ['blogs'],
      })
      if (comment) {
        setComment('')
      }
    }
    setIsMutationHappening(false)
  }

  const onMutationError = (error) => {
    errorHandler(error)
    setIsMutationHappening(false)
  }

  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: onMutationSuccess,
  })

  const addCommentMutation = useMutation({
    mutationFn: addBlogComment,
    onSuccess: onMutationSuccess,
  })

  const errorHandler = (error) =>
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message: error.message, type: 'error' },
    })

  const likeTheBlog = () => {
    setIsMutationHappening(true)
    likeBlogMutation.mutate(
      { ...blog, likes: blog.likes + 1 },
      {
        onError: onMutationError,
      }
    )
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    setIsMutationHappening(true)
    addCommentMutation.mutate(
      {
        id: blog.id,
        comment,
      },
      {
        onError: onMutationError,
      }
    )
  }

  if (!blog) return

  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <Button disabled={isMutationHappening} onClick={likeTheBlog}>
          like
        </Button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <Form onSubmit={handleAddComment}>
        <InputGroup className='mb-3'>
          <Form.Control
            placeholder='Write a comment.'
            required={true}
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant='outline-secondary'
            disabled={isMutationHappening}
            type='submit'
          >
            add comment
          </Button>
        </InputGroup>
      </Form>
      <ListGroup>
        {blog.comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default BlogDetails
