import { combineReducers } from 'redux'
import * as Actions from './actions'

export * from './actions'

const initialState = {
  all: [],
  visible: [],
  lastIndexShown: 9
}

function messages(state=initialState, action) {
  let all, visible
  switch(action.type) {
    case Actions.LOAD_MORE:
      const lastIndexShown = state.lastIndexShown + 10
      visible = state.all.slice(0, lastIndexShown)
      return Object.assign({}, state, { visible, lastIndexShown })
    case Actions.MESSAGES_RECEIVED:
      all = action.msgs.concat(state.all)
      visible = all.slice(0, state.lastIndexShown)
      return { all, visible, lastIndexShown: state.lastIndexShown }
    case Actions.MESSAGES_DELETED:
      return initialState
    default:
      return state
  }
}

function fetching(state=false, action) {
  switch(action.type) {
    case Actions.MESSAGES_RECEIVED:
      return false
    case Actions.FETCHING_MESSAGES:
      return true
    default:
      return state
  }
}

export default combineReducers({ messages, fetching })
