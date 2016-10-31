const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8080, () => {
  console.log('Servidor corriendo')
})

io.on('connection', (socket) => {
  console.log('Cliente conectado')
  socket.emit('params', {
    timeout: _timeout,
    stress: _stress,
    msgsPerLoop: _msgsPerLoop
  })
  socket.on('clearMessages', () => {
    clearMessages()
    socket.emit('messagesDeleted')
  })
  socket.on('getMessages', (msg) => {
    socket.emit("messages", _messages)
  })
  socket.on('startStress', () => {
    startStress()
  })
  socket.on('stopStress', () => {
    stopStress()
  })
  socket.on('setTimeout', (timeout) => {
    _timeout = timeout
    restartStress()
  })
  socket.on('setMsgsPerLoop', (msgsPerLoop) => {
    _msgsPerLoop = msgsPerLoop
    restartStress()
  })
})

let _stress = false
let _timeout = 1000
let _msgsPerLoop = 1
let _messages = []
let _intervalFn

function startStress() {
  _stress = true
  _intervalFn = setInterval(() => {
    for (let i = 0; i < _msgsPerLoop; i++) {
      const id = _messages.length
      const msg = { name: `cosa ${id}`, id: id }
      _messages.unshift(msg)
      io.emit('newMessage', msg)
    }
  }, _timeout)
}

function stopStress() {
  clearInterval(_intervalFn)
  _stress = false
}

function clearMessages() {
  _messages = []
}

function restartStress() {
  if (_stress) {
    stopStress()
    startStress()
  }
}
