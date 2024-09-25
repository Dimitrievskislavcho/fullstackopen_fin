import axios from 'axios'
import { getAuthorizationHeader } from './login'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = (newBlog) => {
  const config = {
    headers: { Authorization: getAuthorizationHeader() },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then((response) => response.data)
}

const likeBlog = ({ id, likes }) => {
  const config = {
    headers: { Authorization: getAuthorizationHeader() },
  }
  const request = axios.patch(
    `${baseUrl}/${id}`,
    {
      likes,
    },
    config
  )
  return request.then((response) => response.data)
}

const addBlogComment = ({ id, comment }) => {
  const config = {
    headers: { Authorization: getAuthorizationHeader() },
  }
  const request = axios.post(
    `${baseUrl}/${id}/comments`,
    {
      comment,
    },
    config
  )
  return request.then((response) => response.data)
}

export { getAll, createBlog, likeBlog, addBlogComment }
