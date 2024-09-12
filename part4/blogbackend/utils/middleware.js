const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

const extractToken = (request, response, next) => {
  const authorization = request.get('authorization') || ''
  const [authScheme, token] = authorization.split(' ')
  request.token = ('Bearer' === authScheme && token) || null
  next()
}

const extractUser = async (request, response, next) => {
  const encryptedToken = request.token

  if (!encryptedToken) {
    response.status(401).json({ error: 'Auth token not provided or invalid' })
    return
  }
  const { id: userId } = jwt.decode(encryptedToken, process.env.SECRET)
  request.user = (await User.findById(userId)).toJSON()
  next()
}

module.exports = { extractToken, errorHandler, extractUser }
