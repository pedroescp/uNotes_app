const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://127.0.0.1:5173',
        //origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})

io.on("connection", Socket => {
    console.log("connected");
})