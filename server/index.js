const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8080, () => {
  console.log('Servidor corriendo')
})

io.on('connection', (socket) => {
  console.log('Cliente conectado', { timeout, stress })
  socket.emit('params', { timeout, stress })
  socket.on('clearMessages', () => {
    clearMessages()
    socket.emit('messagesDeleted')
  })
  socket.on('getMessages', (msg) => {
    socket.emit("messages", messages)
  })
  socket.on('startStress', () => {
    console.log('start stress')
    startStress()
  })
  socket.on('stopStress', () => {
    console.log('stop stress')
    stopStress()
  })
  socket.on('setTimeout', (newTimeout) => {
    timeout = newTimeout
    if (stress) {
      stopStress()
      startStress()
    }
  })
})

let stress = false
let timeout = 1000
let messages = []
let intervalFn
function startStress() {
  console.log(timeout)
  stress = true
  intervalFn = setInterval(() => {
    const id = messages.length
    const msg = { name: `cosa ${id}`, id: id }
    console.log(msg)
    messages.unshift(msg)
    io.emit('newMessage', msg)
  }, timeout)
}

function stopStress() {
  clearInterval(intervalFn)
  stress = false
}

function clearMessages() {
  messages = []
}
