const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});
httpServer.listen(3000);

const users = {};

io.on("connection", (socket)=>{
    socket.on("new-user-connection", name => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name)
    });
    socket.on("send", message =>{
        socket.broadcast.emit("received", {"message": message, "name":users[socket.id]});
    });

});