const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');

const app = express();
const port = process.env.PORT || 8080;

const io = new Server({ cors: 'http://localhost:5173' });

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/chats', chatRouter);
app.use('/api/messages', messageRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the app chat realtime!');
});

mongoose
    .connect('mongodb://localhost:27017/chat-app')
    .then(() => {
        console.log('Connected database successfully');
    })
    .catch((err) => {
        console.log('Connection error: ' + err);
    });

let onlineUsers = [];

io.on('connection', (socket) => {
    console.log('Kết nối mới :', socket.id);

    // Người dùng online
    socket.on('addNewUser', (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({
                userId,
                socketId: socket.id,
            });

        io.emit('getOnlineUsers', onlineUsers);
    });

    // Gửi tin nhắn
    socket.on('sendMessage', (message) => {
        const user = onlineUsers.find((user) => user.userId === message.recipientId);

        if (user) {
            io.to(user.socketId).emit('getMessage', message);
            io.to(user.socketId).emit('getNotification', {
                senderId: message.sender_id,
                isRead: false,
                date: new Date(),
            });
        }
    });

    // Người dùng off
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

        console.log('Ngắt kết nối :', socket.id);

        io.emit('getOnlineUsers', onlineUsers);
    });
});

io.listen(3000);

app.listen(port, (req, res) => {
    console.log('Listening on port ' + port);
});
