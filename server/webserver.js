const _ = require('lodash');
const colors = require('colors/safe');
const Koa = require('koa');
const convert = require('koa-connect');
const serveStatic = require('koa-static');
const route = require('koa-route');
const proxy = require('http-proxy-middleware');

module.exports.run = function (config) {
    const app = new Koa();

    // jira proxy
    if (config.jira) {
        app.use(convert(proxy('/jira', {
            target: config.jira.server,
            changeOrigin: true,
            pathRewrite: {
                '^/jira': '/'
            },
            auth: `${config.jira.user}:${config.jira.password}`
        })));
    }

    // gitlab proxy
    if (config.gitlab) {
        app.use(convert(proxy('/gitlab', {
            target: config.gitlab.server,
            changeOrigin: true,
            pathRewrite: {
                '^/gitlab': '/'
            },
            headers: {
                'Private-Token': config.gitlab.token
            }
        })));
    }

    // static files
    app.use(serveStatic('./build'));

    // config endpoint
    app.use(route.get('/api/config', cxt => {
        cxt.body = _.pick(config, 'server', 'transition');
    }));

    const port = config.server.port.web;
    app.listen(port);
    console.log(colors.green.bold(`Static - Server listening on port ${port}`));

    return app;
};
    