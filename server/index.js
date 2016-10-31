const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8080, () => {
  console.log('Servidor corriendo')
})

io.on('connection', (socket) => {
  console.log('Cliente conectado')
  socket.emit('params', stressConfig)
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
    stressConfig.timeout = timeout
    restartStress()
  })
  socket.on('setMsgsPerLoop', (msgsPerLoop) => {
    stressConfig.msgsPerLoop = msgsPerLoop
    restartStress()
  })
})

let stressConfig = {
  stress: false,
  timeout: 1000,
  msgsPerLoop: 1
}

let _messages = []
let _intervalFn

function startStress() {
  stressConfig.stress = true
  const { msgsPerLoop, timeout } = stressConfig
  _intervalFn = setInterval(() => {
    for (let i = 0; i < msgsPerLoop; i++) {
      const id = _messages.length
      const msg = { name: `cosa ${id}`, id: id }
      _messages.unshift(msg)
      io.emit('newMessage', msg)
    }
  }, timeout)
}

function stopStress() {
  clearInterval(_intervalFn)
  stressConfig.stress = false
}

function clearMessages() {
  _messages = []
}

function restartStress() {
  if (stressConfig.stress) {
    stopStress()
    startStress()
  }
}
