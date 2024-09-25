import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import AppContext from '../AppContext'
import { createBlog } from '../services/blogs'
import { Button, Form, InputGroup } from 'react-bootstrap'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient()
  const { dispatch } = useContext(AppContext)
  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat([newBlog]))
      console.log('a')
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'success',
          message: `a new blog ${newBlog.title}! by ${
            newBlog.author ? newBlog.author : 'Unknown authhor'
          } added`,
        },
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    },
  })

  const onSubmit = (event) => {
    event.preventDefault()
    newBlogMutation.mutate(
      { title, url, author },
      {
        onError: (error) =>
          dispatch({
            type: 'SET_NOTIFICATION',
            payload: { type: 'error', message: error.message },
          }),
      }
    )
  }

  return (
    <>
      <h2>create new</h2>
      <Form onSubmit={onSubmit}>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>title</InputGroup.Text>
          <Form.Control
            type='text'
            value={title}
            name='Title'
            required={true}
            onChange={({ target }) => setTitle(target.value)}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>author</InputGroup.Text>
          <Form.Control
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </InputGroup>
        <InputGroup size='sm' className='mb-3'>
          <InputGroup.Text id='inputGroup-sizing-sm'>url</InputGroup.Text>
          <Form.Control
            type='text'
            value={url}
            name='Url'
            required={true}
            onChange={({ target }) => setUrl(target.value)}
          />
        </InputGroup>
        <Button className='mb-3' variant='outline-secondary' type='submit'>
          create
        </Button>
        <br />
      </Form>
    </>
  )
}

export default BlogForm
