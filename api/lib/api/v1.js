module.exports = function (router, storage) {

    var bodyParser = require('body-parser');

    router.post('/urls', bodyParser.json(), function (req, res) {
        if (!req.body || !req.body.url) {
            return res.send(400, {message: '<|°_°|> I just broke', error: 'Malformed input'});
        }
        storage.add(req.body.url, function(id) {
            res.send(201, {message: '<I^‿^I>', id: id});
        })
    });

    return router;
};