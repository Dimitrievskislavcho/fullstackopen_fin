const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
})

schema.plugin(uniqueValidator)

const User = mongoose.model('User', schema)

module.exports = User
