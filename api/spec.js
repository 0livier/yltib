var request = require('supertest');
var server = require('./server');

setTimeout(function () {
    describe('loading express', function () {
        it('returns 201 when minifying an URL then 200 when querying it', function (done) {
                request(server)
                    .post('/v1/urls/').type('json').send({url: "http://cnn.com"})
                    .expect(201)
                    .end(function(err, res) {
                        request(server)
                            .get('/v1/urls/' + res.body.id)
                            .expect(200, { url: 'http://cnn.com' }, done)
                        ;
                    });
                });

        it('returns 404 on unexpected URL', function (done) {
            request(server)
                .get('/foo/bar/gee')
                .expect(404, done);
        });

    });
    run();
}, 100);
