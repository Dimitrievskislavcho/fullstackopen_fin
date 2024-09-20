import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../services/anecdotes'
import { useAppDispatch } from '../AppContext'

const AnecdoteForm = () => {
  const appDispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      appDispatch({
        type: 'setNotification',
        payload: `anecdote '${newAnecdote.content}' created`,
      })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    anecdoteMutation.mutate(content, {
      onError: ({
        response: {
          data: { error },
        },
      }) => appDispatch({ type: 'setNotification', payload: error }),
    })
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
