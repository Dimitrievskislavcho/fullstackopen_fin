const Blog = require('../models/blog')
const User = require('../models/user')

const dataPurgeRouter = require('express').Router()

dataPurgeRouter.post('/', async ({ respose }) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  respose.status(200)
})

module.exports = dataPurgeRouter
