import { useState } from 'react'

const BlogForm = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  return (
    <>
      <h2>create new</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          const newBlog = await onCreateBlog({ title, author, url })
          if (newBlog) {
            setTitle('')
            setAuthor('')
            setUrl('')
          }
        }}
      >
        <div>
          title
          <input
            type='text'
            value={title}
            name='Title'
            required={true}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='Url'
            required={true}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
