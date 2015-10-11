module.exports = function (config, router, storage) {

    var bodyParser = require('body-parser');

    router.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    router.param('id', function (req, res, next, id) {
        if (!id.match(/^[a-zA-Z\d]+$/)) {
            return next(new Error("Id is not well formatted: only the following chars are a-zA-Z0-9"));
        }

        req.params.id = id;

        next();
    });

    router.get('/urls/:id', function (req, res) {
        storage.get(req.params.id, function(full_url) {
            if (full_url) {
                return res.send(200, {url: full_url});
            }
            res.send(404, {message: '<|°_°|> I just broke', error: 'Resource not found'});
        })
    });

    router.post('/urls', bodyParser.json(), function (req, res) {
        if (!req.body || !req.body.url) {
            return res.send(400, {message: '<|°_°|> I just broke', error: 'Malformed input'});
        }
        storage.add(req.body.url, function(id) {
            res.send(201, {message: '<I^‿^I>', id: id, url: config.base_url + id});
        })
    });

    return router;
};