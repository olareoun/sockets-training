import socket from '../../things/socket'

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'
export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export const MESSAGES_DELETED = 'MESSAGES_DELETED'
export const FETCH_MESSAGES = 'FETCH_MESSAGES'
export const FETCHING_MESSAGES = 'FETCHING_MESSAGES'
export const LOAD_MORE = 'LOAD_MORE'

export function addMessage(msg) {
  return {
    type: MESSAGE_RECEIVED,
    msg
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

export function messagesDeleted() {
  return {
    type: MESSAGES_DELETED
  }
}

export function loadMore() {
  return {
    type: LOAD_MORE
  }
}

function fetchingMessages() {
  return {
    type: FETCHING_MESSAGES
  }
}

