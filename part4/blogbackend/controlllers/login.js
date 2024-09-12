const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const sendNotAuthorized = ({ response, reason }) =>
  response.status(401).json({ error: `invalid ${reason}` })

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const users = await User.find({})
  const user = users.find((user) => user.username === username)

  if (!user) {
    sendNotAuthorized({ reason: 'username', response })
    return
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

  if (!isCorrectPassword) {
    sendNotAuthorized({ reason: 'password', response })
    return
  }

  const token = jwt.sign({ username, id: user.id }, process.env.SECRET)

  response.json({ token, username, name: user.name })
})

module.exports = loginRouter
