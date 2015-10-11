require('dotenv').load();

// --------------------------------------------------------------------

var fs = require('fs');
var express = require('express');
var app = express();

// --------------------------------------------------------------------

app.get('/', function (req, res) {
    fs.readFile('public/index.html', function(err, content) {
        content = content.toString().replace(/##\s*([^#]+)\s*##/, function(match, m1) {
            return process.env[m1];
        });
        res.send(content);
    });
});

app.use(express.static('public'));

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

module.exports = server;