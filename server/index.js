const minimist = require('minimist');
const Config = require('./config');
const staticServer = require('./static');
const websocket = require('./websocket');

const argv = minimist(process.argv.slice(2));

// server port
const httpPort = parseInt(argv.port || Config.port);
console.log(httpPort);
const wsPort = httpPort + 1;

// jira credentials
Config.jira.user = argv.user;
Config.jira.passw = argv.passw;
if (!Config.jira.user || !Config.jira.passw) {
    throw 'Jira credentials (--user and --passw) must be provided in arguments';
}

// start servers
staticServer.run(httpPort);
websocket.run(wsPort);