import { createContext, useReducer } from 'react'
import appReducer, { initialState } from './reducer'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
export { AppContextProvider }
export default AppContext
