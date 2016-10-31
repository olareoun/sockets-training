const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const Stress = require('./stress')
const Messages = require('./messages')

server.listen(8080, () => {
  console.log('Servidor corriendo')
})

let stressConfig = {
  stress: false,
  timeout: 1000,
  msgsPerLoop: 1
}

const messages = Messages()
const stress = new Stress(stressConfig, io, messages)

io.on('connection', (socket) => {
  console.log('Cliente conectado')
  socket.emit('params', stress.getParams())
  socket.on('clearMessages', () => {
    messages.clear()
    socket.emit('messagesDeleted')
  })
  socket.on('getMessages', (msg) => {
    socket.emit("messages", messages.list())
  })
  socket.on('startStress', () => {
    stress.startStress()
  })
  socket.on('stopStress', () => {
    stress.stopStress()
  })
  socket.on('setTimeout', (timeout) => {
    stress.setTimeout(timeout)
  })
  socket.on('setMsgsPerLoop', (msgsPerLoop) => {
    stress.setMsgsPerLoop(msgsPerLoop)
  })
})

