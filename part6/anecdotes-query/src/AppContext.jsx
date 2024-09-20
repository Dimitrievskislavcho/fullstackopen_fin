import { createContext, useContext, useReducer } from 'react'

export const AppContext = createContext()

const appReducer = (state = { notification: '' }, action) => {
  switch (action.type) {
    case 'setNotification':
      return { ...state, notification: action.payload }
    default:
      return state
  }
}

const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, {
    notification: '',
  })

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  )
}

const useAppState = () => {
  const { state } = useContext(AppContext)
  return state
}

const useAppDispatch = () => {
  const { dispatch } = useContext(AppContext)
  return dispatch
}

// eslint-disable-next-line react-refresh/only-export-components
export { AppContextProvider, useAppDispatch, useAppState }
export default AppContext
