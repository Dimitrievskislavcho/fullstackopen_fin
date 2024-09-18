const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const api = supertest(require('../app'))
const Blog = require('../models/blog')
const { isUndefined } = require('lodash')
const {
  setupBlogs,
  isBlogAvailable,
  getAllBlogs,
} = require('./blogs_api_helper')
const User = require('../models/user')

const userInfo = {
  username: 'johndoe',
  password: 'password',
}

describe('blogs api:', () => {
  let token

  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(userInfo)
    const loginResponse = await (
      await api.post('/api/login').send(userInfo)
    ).body
    token = loginResponse.token
    await Blog.deleteMany({})
    await Promise.all(
      setupBlogs.map((setupBlog) =>
        api.post('/api/blogs').auth(token, { type: 'bearer' }).send(setupBlog)
      )
    )
  })

  describe('retrieving blogs', () => {
    test('blogs are returned as json', async () => {
      const blogs = (await api.get('/api/blogs')).body

      assert.strictEqual(blogs.length, 1)
    })

    test("blogs have unique identifier 'id' as a property", async () => {
      const [{ id }] = (await api.get('/api/blogs')).body
      assert(!isUndefined(id))
    })
  })

  describe('saving a blog', () => {
    test('a new blog/post is successfully saved', async () => {
      const blog = {
        title: 'Test blog title',
        author: 'Jane Doe',
        url: 'http://localhost-test:3001',
        likes: 2,
      }

      await api.post('/api/blogs').auth(token, { type: 'bearer' }).send(blog)
      const blogs = await getAllBlogs()
      const [, newBlog] = blogs

      assert.strictEqual(blogs.length, setupBlogs.length + 1)
      assert.strictEqual(newBlog.author, blog.author)
    })

    test('a new blog/post will default to 0 likes if none are present in the request', async () => {
      const blog = {
        title: 'Test blog title',
        author: 'Jane Doe',
        url: 'http://namaste.test.url',
      }

      await api.post('/api/blogs').auth(token, { type: 'bearer' }).send(blog)
      const [, newBlog] = await getAllBlogs()

      assert.strictEqual(newBlog.likes, 0)
    })

    test("a 400 status code is returned when either 'title' or 'url' is missing from the request", async () => {
      const blogWithMissingTitle = {
        author: 'Jane Doe',
        url: 'http://localhost-test:3001',
        likes: 4,
      }
      const blogWithMissingUrl = {
        author: 'Jane Doe',
        title: 'New test title',
        likes: 4,
      }
      await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(blogWithMissingTitle)
        .expect(400)
      await api
        .post('/api/blogs')
        .auth(token, { type: 'bearer' })
        .send(blogWithMissingUrl)
        .expect(400)
      const blogs = await getAllBlogs()

      assert.strictEqual(blogs.length, setupBlogs.length)
    })

    test('a 401 status code is returned if token is not provided', async () => {
      const blog = {
        title: 'Test blog title',
        author: 'Jane Doe',
        url: 'http://localhost-test:3001',
        likes: 2,
      }

      await api.post('/api/blogs').expect(401).send(blog)
    })
  })

  test('deleting a blog will correctly be removed from blogs collection', async () => {
    const blog = {
      author: 'Jane Doe',
      title: 'Test title',
      url: 'http://test-url.org',
    }
    const newBlog = (
      await api.post('/api/blogs').auth(token, { type: 'bearer' }).send(blog)
    ).body
    let blogs = await getAllBlogs()

    assert.strictEqual(blogs.length, setupBlogs.length + 1)
    assert(isBlogAvailable(blogs, newBlog.id))

    await api
      .delete(`/api/blogs/${newBlog.id}`)
      .auth(token, { type: 'bearer' })
      .send()
    blogs = await getAllBlogs()

    assert.strictEqual(blogs.length, setupBlogs.length)
    assert(!isBlogAvailable(blogs, newBlog.id))
  })

  test('patching the likes of a blog will correctly be saved', async () => {
    const blogPatch = {
      likes: 100,
    }
    const [{ id, likes }] = await getAllBlogs()

    await api.patch(`/api/blogs/${id}`).send(blogPatch)

    const [{ likes: patchedLikes }] = await getAllBlogs()

    assert(patchedLikes !== likes)
    assert.strictEqual(patchedLikes, blogPatch.likes)
  })
})

after(() => mongoose.connection.close())
