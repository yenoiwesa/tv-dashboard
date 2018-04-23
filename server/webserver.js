const _ = require('lodash');
const Koa = require('koa');
const convert = require('koa-connect');
const serveStatic = require('koa-static');
const route = require('koa-route');
const proxy = require('http-proxy-middleware');
const Jira = require('./jira');
const Config = require('./config');

module.exports.run = function (port) {
    const app = new Koa();

    // jira proxy
    app.use(convert(proxy('/jira', {
        target: Jira.JIRA_SERVER,
        changeOrigin: true,
        pathRewrite: {
            '^/jira': '/'
        },
        auth: `${Config.jira.user}:${Config.jira.password}`
    })));

    // static files
    app.use(serveStatic('./build'));

    // config endpoint
    app.use(route.get('/api/config', cxt => {
        cxt.body = _.pick(Config, 'server', 'transition');
    }));

    app.listen(port);
    console.log(`static server listening on port ${port}`);

    return app;
};
    