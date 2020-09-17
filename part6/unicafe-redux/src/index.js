import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const doIncremementGood = () => store.dispatch({ type: 'GOOD' })
  const doIncremementBad = () => store.dispatch({ type: 'BAD' })
  const doIncremementNeutral = () => store.dispatch({ type: 'OK' })
  const doReset = () => store.dispatch({ type: 'ZERO' })
  return (
    <div>
      <button onClick={doIncremementGood}>good</button> 
      <button onClick={doIncremementNeutral}>neutral</button> 
      <button onClick={doIncremementBad}>bad</button>
      <button onClick={doReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
