const Koa = require('koa');
const convert = require('koa-connect');
const serveStatic = require('koa-static');
const proxy = require('http-proxy-middleware');
const Jira = require('./jira');

const app = new Koa();
app.use(convert(proxy('/jira', {
    target: Jira.JIRA_SERVER,
    changeOrigin: true,
    pathRewrite: {
        '^/jira' : '/'
    },
    auth: 'matthieu:Objective03?'
})));
app.use(serveStatic('./build'));

module.exports.run = function (port) {
    app.listen(port);
    console.log(`static server listening on port ${port}`);
}
    