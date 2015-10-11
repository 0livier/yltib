var express = require('express');
var config = require('./config.js');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});


var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

module.exports = server;