const staticServer = require('./static');
const websocket = require('./websocket');

staticServer.run(8000);
websocket.run(8001);