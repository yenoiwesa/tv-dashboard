const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

const serve = serveStatic('./build');

const server = http.createServer(function(req, res) {
    const done = finalhandler(req, res);
    serve(req, res, done);
});

module.exports.run = function (port) {
    server.listen(port);
    console.log(`static server listening on port ${port}`);
}
    