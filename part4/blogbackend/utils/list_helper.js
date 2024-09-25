const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>
  blogs.reduce((likesSoFar, blog) => {
    return likesSoFar + blog.likes
  }, 0)

const favoriteBlog = (blogs) => {
  const result = (blogs || []).reduce((favorite, blog) => {
    return favorite?.likes >= blog.likes ? favorite : { ...blog }
  }, null)
  return result
}

const mostBlogs = (allBlogs) => {
  const result = _.maxBy(
    _.entries(_.countBy(allBlogs, 'author')),
    ([, blogs]) => blogs
  )

  return (result || null) && { author: result[0], blogs: result[1] }
}

const mostLikes = (allBlogs) => {
  const result = _.maxBy(
    _.entries(
      _.reduce(
        _.entries(_.groupBy(allBlogs, 'author')),
        (acc, [author, blogs]) => {
          acc[author] = _.sumBy(blogs, 'likes')
          return acc
        },
        {}
      )
    ),
    _.last
  )

  if (!result) {
    return null
  }

  const [author, likes] = result

  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
