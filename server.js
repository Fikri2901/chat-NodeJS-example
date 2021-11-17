const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = 3000
const path = require('path')

const { Server } = require('socket.io')
const io = new Server(server)

io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value'
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html')
})

io.on('connection', (socket) => {
    console.log('a user connected !!')

    socket.on('disconnect', () => {
        console.log('user disconnected !!')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
        console.log('pesan: ' + msg)
    })
})

server.listen(port, () => {
    console.log(`Terhubung di http://localhost:${port}`)
})