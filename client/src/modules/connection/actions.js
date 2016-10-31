import socket from '../../things/socket'
import Messages from '../../things/messages'

export const CONNECTING = 'CONNECTING'
export const PARAMS_RECEIVED = 'PARAMS_RECEIVED'

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
      Messages.clear()
    })
  }
}

export function paramsReceived(params) {
  return {
    type: PARAMS_RECEIVED,
    params
  }
}

function connecting() {
  return {
    type:  CONNECTING
  }
}
