const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = 3000;
const HOST = '192.168.15.178';

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});