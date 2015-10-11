var request = require('supertest');
var server = require('./server');

setTimeout(function () {
    describe('Minifying', function () {
        it('returns 201 when minifying an URL', function (done) {
            var baseURLRegexp = new RegExp(process.env.BASE_URL.replace(/\//g, '\\/'));
            request(server)
                .post('/v1/urls/').type('json').send({url: "http://cnn.com"})
                .expect(baseURLRegexp) // there's the base URL somewhere
                .expect(201, done);
        });
        it('returns 404 on unexpected URL API route', function (done) {
            request(server)
                .get('/foo/bar/gee')
                .expect(404, done);
        });
    });

    describe('Requesting a minified URL', function () {
        var created = null;
        before(function(done) {
            request(server)
                .post('/v1/urls/').type('json').send({url: "http://cnn.com"})
                .expect(function(res) {
                    created = res;
                })
                .expect(201, done);
        });

        it('returns 201 when requesting an existing minified URL', function (done) {
            request(server)
                .get('/v1/urls/' + created.body.id)
                .expect(/http:\/\/cnn.com/)
                .expect(200, done);
        });

        it('returns 404 when requesting an non existing minified URL', function (done) {
            request(server)
                .get('/v1/urls/' + created.body.id + '1')
                .expect(404, done);
        });
    });

    run();
}, 100);
