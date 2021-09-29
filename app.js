const express = require('express');

const app = express();

const http = require('http')
const server = http.createServer(app);

const io = require('socket.io')(server);

app.set('view engine', 'ejs');

io.on('connection', (client) => {
    console.log("client connected!!!");
    client.on('join', function(data) {
        console.log(data);
    });
    client.on('messages', data => {
        client.emit('thread', data);
        client.broadcast.emit('thread', data);

    });
});

app.get('/', (req, res) => {
    res.render("index");
})

server.listen(5000, console.log("Server running on port 5000!!!"));