import express from 'express'
import http from 'http'
import {Socket, Server as SocketServer} from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)

io.on('connection', socket => {
    console.log('client connected')
})

server.listen(3000)
console.log('server on port', 3000)