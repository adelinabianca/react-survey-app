const io = (io) => {
  io.on('connection', socket => {
    socket.emit('numberOfConnections', io.sockets.server.engine.clientsCount);
  });
};

module.exports = io;