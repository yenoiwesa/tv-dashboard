const io = require('socket.io')();
const colors = require('colors/safe');
const Scheduler = require('./scheduler');

module.exports.run = function (config) {
    const scheduler = new Scheduler(data => io.sockets.emit('next-slide', data));
    
    io.on('connection', (client) => {
        console.log('client has connected');
        // synchronise straight away
        scheduler.syncClient(data => client.emit('next-slide', data));
    });

    const port = config.server.port.websocket;
    io.listen(port);
    scheduler.start();
    console.log(colors.green.bold(`WebSocket - Server listening on port ${port}`));
};
