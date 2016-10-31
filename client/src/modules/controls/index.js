import { combineReducers } from 'redux'

import * as Actions from './actions'
import * as ConnectionActions from '../connection/actions'

export * from './actions'

function stress(state=false, action) {
  switch(action.type) {
    case ConnectionActions.PARAMS_RECEIVED:
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
    case ConnectionActions.PARAMS_RECEIVED:
      return action.params.timeout
    case Actions.SET_TIMEOUT:
      return action.timeout
    default:
      return state
  }
}

function msgsPerLoop(state=1, action) {
  switch(action.type) {
    case ConnectionActions.PARAMS_RECEIVED:
      return action.params.msgsPerLoop || state
    case Actions.SET_MSGS_PER_LOOP:
      return action.msgsPerLoop
    default:
      return state
  }
}

export default combineReducers({
  stress, timeout, msgsPerLoop
})
