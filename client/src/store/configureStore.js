import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import messages from '../modules/messages'
import controls from '../modules/controls'

const appReducer = combineReducers({
  messages, controls
})

const enhancer = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f)

export default function configureStore() {
  return createStore(appReducer, enhancer)
}
