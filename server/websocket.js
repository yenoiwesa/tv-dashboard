const io = require('socket.io')();
const Scheduler = require('./scheduler');

module.exports.run = function (port) {
    const scheduler = new Scheduler(data => io.sockets.emit('next-slide', data));
    
    io.on('connection', (client) => {
      console.log('client has connected');
      // synchronise straight away
      scheduler.syncClient(data => client.emit('next-slide', data));
    });

    io.listen(port);
    scheduler.start();
    console.log(`static server listening on port ${port}`);
};
