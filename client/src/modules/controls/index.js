import { combineReducers } from 'redux'

import * as Actions from './actions'
import * as MessagesActions from '../messages/actions'

export * from './actions'

function stress(state=false, action) {
  switch(action.type) {
    case MessagesActions.PARAMS_RECEIVED:
      return action.params.stress
    case Actions.START_STRESS:
      return true
    case Actions.STOP_STRESS:
      return false
    default:
      return state
  }
}

function timeout(state=1000, action) {
  switch(action.type) {
    case MessagesActions.PARAMS_RECEIVED:
      return action.params.timeout
    case Actions.SET_TIMEOUT:
      return action.timeout
    default:
      return state
  }
}

export default combineReducers({
  stress, timeout
})
