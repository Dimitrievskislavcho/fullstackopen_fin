const { default: mongoose } = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (_, object) => {
    object.id = object._id.toString()
    delete object._id
    delete object.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
