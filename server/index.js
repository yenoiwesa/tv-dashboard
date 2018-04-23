const path = require('path');
const minimist = require('minimist');
const Config = require('./config');
const webserver = require('./webserver');
const websocket = require('./websocket');

const argv = minimist(process.argv.slice(2));

// configuration file
const config = argv.config;
if (!config) {
    throw 'Configuration name (--config) must be provided in arguments';
}
Object.assign(Config, require(path.resolve(__dirname, '../config', config)));

// jira credentials
const jiraCredentials = (argv['jira-auth'] || '').split(':');
if (jiraCredentials.length !== 2) {
    throw 'Jira credentials (--jira-auth=user:password) must be provided in arguments';
}
Config.jira.user = jiraCredentials[0];
Config.jira.password = jiraCredentials[1];

// start servers
webserver.run(Config.server.port.web);
websocket.run(Config.server.port.websocket);