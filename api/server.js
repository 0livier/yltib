var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config.js');
var StorageMongodb = require('./lib/storage_mongodb.js');
var storage = new StorageMongodb(config.mongodb, require('base62'));

var app = express();
app.use(bodyParser.json());

app.use('/v1', require('./lib/api/v1.js')(express.Router(), storage));

app.use(function (req, res, next) {
    res.status(404).send({message: '<|°_°|> I just broke', error: 'Resource not found'});
});

app.use(function (err, req, res, next) {
    res.status(500).send({message: '<|°_°|> I just broke', error: err.message});
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

module.exports = server;