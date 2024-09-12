const Blog = require('../models/blog')
const User = require('../models/user')
const { extractUser } = require('../utils/middleware')

const blogsRouterMiddlewear = require('express').Router()

blogsRouterMiddlewear.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(blogs)
})

blogsRouterMiddlewear.post('/', extractUser, async (request, response) => {
  const { id: userId } = request.user || {}

  if (!request.body.url || !request.body.title) {
    response.status(400).json({
      error: 'both title and url must be present in the request body',
    })
    return
  }
  const user = await User.findById(userId)

  const blog = new Blog({
    ...request.body,
    likes: typeof request.body.likes === 'undefined' ? 1 : request.body.likes,
    user: userId,
  })
  const newBlog = await blog.save()

  user.blogs = user.blogs.concat(blog)
  await user.save()

  response.status(201).json(newBlog)
})

blogsRouterMiddlewear.delete('/:id', extractUser, async (request, response) => {
  const { id: userId } = request.user || {}

  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog.user.toString() === userId) {
    await blog.deleteOne()

    response.status(204).end()
  } else {
    response.status(401).json({ error: 'Auth token not provided or invalid' })
  }
})

blogsRouterMiddlewear.patch('/:id', extractUser, async (request, response) => {
  const { id: userId } = request.user || {}
  const body = request.body

  const patchedBlog = {
    likes: body.likes,
  }

  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog.user.toString() === userId) {
    await blog.updateOne(patchedBlog, { new: true })

    response.json(updatedBlog)
  } else {
    response.status(401).json({ error: 'Auth token not provided or invalid' })
  }
})

module.exports = blogsRouterMiddlewear
