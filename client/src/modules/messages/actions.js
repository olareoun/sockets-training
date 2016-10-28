import socket from '../../things/socket'
import Messages from '../../things/messages'

export const CONNECTING = 'CONNECTING'
export const PARAMS_RECEIVED = 'PARAMS_RECEIVED'
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export const MESSAGES_DELETED = 'MESSAGES_DELETED'
export const FETCH_MESSAGES = 'FETCH_MESSAGES'
export const FETCHING_MESSAGES = 'FETCHING_MESSAGES'

export function addMessage(msg) {
  return {
    type: MESSAGE_RECEIVED,
    msg
  }
}

export function connectSource() {
  return (dispatch, state) => {
    Messages.setDispatcher(dispatch)
    dispatch(connecting())
    socket.on('params', (params) => {
      dispatch(paramsReceived(params))
    })
    socket.on('messages', (msgs) => {
      Messages.addMany(msgs)
    })
    socket.on('newMessage', (msg) => {
      Messages.add(msg)
    })
    socket.on('messagesDeleted', () => {
      dispatch(messagesDeleted())
    })
  }
}

export function clearMessages() {
  return (dispatch, state) => {
    socket.emit('clearMessages')
  }
}

export function getMessages() {
  return (dispatch, state) => {
    dispatch(fetchingMessages())
    socket.emit('getMessages')
  }
}

export function messagesReceived(msgs) {
  return {
    type: MESSAGES_RECEIVED,
    msgs
  }
}

export function paramsReceived(params) {
  return {
    type: PARAMS_RECEIVED,
    params
  }
}

function fetchingMessages() {
  return {
    type: FETCHING_MESSAGES
  }
}

function messagesDeleted() {
  return {
    type: MESSAGES_DELETED
  }
}

function connecting() {
  return {
    type:  CONNECTING
  }
}
