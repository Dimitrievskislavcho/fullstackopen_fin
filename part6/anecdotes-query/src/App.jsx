import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { queryAnecdotes, voteAnecdote } from './services/anecdotes'
import { useAppDispatch } from './AppContext'

const App = () => {
  const handleVote = (anecdote) => {
    anecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const queryClient = useQueryClient()
  const appDispatch = useAppDispatch()
  const anecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
        )
      )
      appDispatch({
        type: 'setNotification',
        payload: `anecdote '${
          anecdotes.find((anecdote) => votedAnecdote.id === anecdote.id).content
        }' voted`,
      })
    },
  })

  const {
    isLoading,
    data: anecdotes,
    error,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: queryAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  })

  if (error) {
    return 'anecdote service not available due to problems in server'
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      {isLoading && 'Anecdotes are loading...'}
      {anecdotes &&
        anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default App
