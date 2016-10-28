import io from 'socket.io-client'

module.exports = (() => {

  const socket = io('http://localhost:8080')

  return {
    on,
    emit
  }

  function on(msgKey, cb) {
    socket.on(msgKey, cb)
  }

  function emit(msgKey, cb) {
    socket.emit(msgKey, cb)
  }

})()
