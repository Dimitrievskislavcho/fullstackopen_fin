import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { setNotification } from '../reducers/notificationReducer'
import { initiateAnecdoteVoting } from '../reducers/anecdoteReducer'

const anecdotesSelector = (state) => state.anecdotes
const filterSelector = (state) => state.filter
const memoizedAnecdotesSelector = createSelector(
  anecdotesSelector,
  filterSelector,
  (anecdotes, filter) =>
    anecdotes
      .filter(
        ({ content }) =>
          content.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
      )
      .sort(
        (firstAnecdote, secondAnecdote) =>
          secondAnecdote.votes - firstAnecdote.votes
      )
)

const AnecdoteList = () => {
  const anecdotes = useSelector(memoizedAnecdotesSelector)
  const dispatch = useDispatch()

  const vote = async ({ id, content }) => {
    await dispatch(initiateAnecdoteVoting(id))
    dispatch(setNotification(`you voted '${content}'`))
  }
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
