import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const queryAnecdotes = () => axios.get(baseUrl).then((res) => res.data)

const addAnecdote = (content) =>
  axios.post(baseUrl, { content, votes: 0 }).then((res) => res.data)

const voteAnecdote = (votedAnecdote) =>
  axios
    .put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
    .then((res) => res.data)

export { queryAnecdotes, addAnecdote, voteAnecdote }
