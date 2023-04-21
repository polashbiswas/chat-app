const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on("chat message", (data) => {
        io.emit("chat message", data);
        // console.log("Message is being set to every one", data.message);
    });

    socket.on("username enter", (data) => {
        io.emit("username enter", data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
    socket.on("user left", (data) => {
        io.emit("user left", data);
    })
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});