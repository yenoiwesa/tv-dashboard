const Koa = require('koa');
const convert = require('koa-connect');
const serveStatic = require('koa-static');
const proxy = require('http-proxy-middleware');
const Jira = require('./jira');
const Config = require('./config');

module.exports.run = function (port) {
    const app = new Koa();
    app.use(convert(proxy('/jira', {
        target: Jira.JIRA_SERVER,
        changeOrigin: true,
        pathRewrite: {
            '^/jira' : '/'
        },
        auth: `${Config.jira.user}:${Config.jira.passw}`
    })));
    app.use(serveStatic('./build'));

    app.listen(port);
    console.log(`static server listening on port ${port}`);
}
    