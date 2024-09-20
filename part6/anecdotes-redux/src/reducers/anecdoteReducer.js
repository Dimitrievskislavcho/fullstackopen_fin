import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createAnecdote,
  getAnecdotes,
  voteAnecdote,
} from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdotesSlice = createSlice({
  initialState: [],
  name: 'anecdotes',
  reducers: {
    addAnecdote: (state, action) => {
      state.push(action.payload)
    },
    refreshAnecdotes: (state, action) => {
      state.push(...action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(initiateAnecdoteVoting.fulfilled, (state, action) => {
      const anecdote = state.find(({ id }) => id === action.payload.id)
      anecdote.votes = action.payload.votes
    })
  },
})

export const initiateAnecdoteVoting = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async (anecdoteId, { getState }) => {
    const { anecdotes } = getState()
    const anecdoteForVoting = anecdotes.find(({ id }) => id === anecdoteId)
    if (anecdoteForVoting) {
      const updatedAnecdote = await voteAnecdote(anecdoteForVoting)
      return updatedAnecdote
    }
  }
)

export const { addAnecdote, refreshAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const response = await getAnecdotes()
  dispatch(refreshAnecdotes(response))
}

export const saveAnecdote = (anecdote) => async (dispatch) => {
  const response = await createAnecdote(anecdote)
  dispatch(addAnecdote(response))
  dispatch(setNotification(`you created '${anecdote}'`))
}

export default anecdotesSlice.reducer
