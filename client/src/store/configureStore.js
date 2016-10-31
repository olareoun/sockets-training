import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import messages from '../modules/messages'
import controls from '../modules/controls'
import connection from '../modules/connection'

const appReducer = combineReducers({
  messages, controls, connection
})

const enhancer = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f)

export default function configureStore() {
  return createStore(appReducer, enhancer)
}
