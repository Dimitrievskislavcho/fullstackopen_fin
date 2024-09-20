import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const createAction = (action) => {
    return () =>
      store.dispatch({
        type: action.toUpperCase(),
      })
  }
  const { good, ok, bad } = store.getState() || {}

  return (
    <div>
      <button onClick={createAction('good')}>good</button>
      <button onClick={createAction('ok')}>ok</button>
      <button onClick={createAction('bad')}>bad</button>
      <button onClick={createAction('zero')}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
