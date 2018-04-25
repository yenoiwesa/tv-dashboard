const _ = require('lodash');
const path = require('path');
const minimist = require('minimist');
const prompt = require('prompt');
const Config = require('./config');
const webserver = require('./webserver');
const websocket = require('./websocket');

const argv = minimist(process.argv.slice(2));

prompt.override = argv;
prompt.start();

(new Promise((resolve, reject) => {
    const schema = {
        name: 'config',
        description: 'Configuration (from the config directory)',
        required: true
    };
    prompt.get(schema, (err, result) => {
        if (err) { return reject(err); }
        resolve(result.config);
    });
}))
    .then(config => {
        return _.merge(Config, require(path.resolve(__dirname, '../config', config)));
    })
    .then(config => {
        // if user has setup jira
        // must prompt for jira credentials
        if (!config.jira) { return config; }
        
        prompt.start();

        return new Promise((resolve, reject) => {
            const schema = [
                {
                    name: 'jiraUsername',
                    description: 'Jira Username',
                    required: true
                },
                {
                    name: 'jiraPassword',
                    description: 'Jira Password',
                    required: true,
                    hidden: true
                }
            ];
            prompt.get(schema, (err, result) => {
                if (err) { return reject(err); }
                config.jira.user = result.jiraUsername;
                config.jira.password = result.jiraPassword;
                resolve(config);
            });
        });
    })
    .then(config => {
        // if user has setup gitlab
        // must prompt for gitlab credentials
        if (!config.gitlab) { return config; }

        prompt.start();

        return new Promise((resolve, reject) => {
            const schema = {
                name: 'gitlabToken',
                description: 'Gitlab Private Token',
                required: true,
                hidden: true
            };
            prompt.get(schema, (err, result) => {
                if (err) { return reject(err); }
                config.gitlab.token = result.gitlabToken;
                resolve(config);
            });
        });
    })
    .then(config => {
        // start servers
        webserver.run(config);
        websocket.run(config);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });