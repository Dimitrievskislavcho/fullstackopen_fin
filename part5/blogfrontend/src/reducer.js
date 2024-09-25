import { getUserFromStorage } from './services/login'

export const initialState = {
  notification: '',
  user: getUserFromStorage(),
}

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, notification: action.payload }
    case 'SET_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

export default appReducer
