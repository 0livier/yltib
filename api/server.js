require('dotenv').load();
var config = require('./config.js');

// --------------------------------------------------------------------

var express = require('express');
var bodyParser = require('body-parser');

// --------------------------------------------------------------------

var StorageMongodb = require('./lib/storage_mongodb.js');
var storage = new StorageMongodb(config.mongodb, require('base62'));

// --------------------------------------------------------------------

var app = express();
app.use(bodyParser.json());
app.disable('etag');

app.use('/v1', require('./lib/api/v1.js')(config.api, express.Router(), storage));

app.use(function (req, res, next) {
    res.status(404).send({message: '<|°_°|> I just broke', error: 'Resource not found'});
});

app.use(function (err, req, res, next) {
    res.status(500).send({message: '<|°_°|> I just broke', error: err.message});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});

module.exports = server;