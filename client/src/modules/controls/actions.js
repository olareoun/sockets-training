import socket from '../../things/socket'

export const START_STRESS = 'START_STRESS'
export const STOP_STRESS = 'STOP_STRESS'
export const SET_TIMEOUT = 'SET_TIMEOUT'

export function setTimeout(timeout) {
  return (dispatch, state) => {
    dispatch({ type: SET_TIMEOUT, timeout })
    socket.emit('setTimeout', timeout)
  }
}

export function startStress() {
  return (dispatch, state) => {
    dispatch({ type: START_STRESS })
    socket.emit('startStress')
  }
}

export function stopStress() {
  return (dispatch, state) => {
    dispatch({ type: STOP_STRESS })
    socket.emit('stopStress')
  }
}
