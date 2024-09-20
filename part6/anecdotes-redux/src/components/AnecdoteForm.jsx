import { useDispatch } from 'react-redux'
import { saveAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    if (!anecdote) return
    try {
      await dispatch(saveAnecdote(anecdote))
      event.target.anecdote.value = ''
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
