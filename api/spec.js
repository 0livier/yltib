var request = require('supertest');
describe('Bitly clone API', function () {
    var server = require('./server');

    it('returns 201 when minifying an URL', function(done) {
        request(server)
            .post('/v1/urls/').type('json').send({url: "http://cnn.com"})
            .expect(201).end(function(err, res) {
                request(server)
                    .get('/v1/urls/' + res.body.id)
                    .expect(301)
                    .expect('Location', 'http://cnn.com');
                done();
            }
        );

    });
    it('returns 404 on unexpected URL', function(done) {
        request(server)
            .get('/foo/bar/gee')
            .expect(404, done);
    });

});
