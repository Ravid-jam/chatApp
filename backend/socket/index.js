const socket = require("socket.io");
const saveMessage = require("../controller/savemessage");

const onlineUsers = [];
const addUser = (user, socketId) => {
  const isExits = onlineUsers.findIndex((item) => item._id === user._id);
  if (isExits !== -1) {
    onlineUsers.splice(isExits, 1);
  }
  user.socketId = socketId;
  onlineUsers.push(user);
};

const removeUser = (socketId) => {
  const isExits = onlineUsers.findIndex((item) => item.socketId === socketId);
  if (isExits !== -1) {
    onlineUsers.splice(isExits, 1);
  }
};
const socketInit = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connect", (socket) => {
    console.log("New client connected", socket.id);
    socket.on("ADD_USER", (user) => {
      addUser(user, socket.id);
      io.emit("USER_ADDED", onlineUsers);
    });
    socket.on("SEND_MSG", async (message) => {
      const savedMessage = await saveMessage(message);
      io.to(message.receiver.socketId)
        .to(message.sender.socketId)
        .emit("RECEIVED_MSG", savedMessage);
    });
    socket.on("DELETE_MSG", (msg) => {
      socket.to(msg.receiver.socketId).emit("DELETED_MSG", msg);
    });
    socket.on("IS_DOWNLOADED", async (data) => {
      const res = await saveMessage.isDownloaded(data);
      socket.emit("IS_DOWNLOADED_RESPONSE", res);
    });
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("USER_ADDED", onlineUsers);
    });
  });
};

module.exports = socketInit;
