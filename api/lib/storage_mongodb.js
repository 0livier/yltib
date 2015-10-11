var MongoClient = require("mongodb").MongoClient;
var db;
var encoder;

function MongoDBBackend(config, myencoder) {
    encoder = myencoder;

    MongoClient.connect(config.url,
        function (err, database) {
            if (err) {
                throw err;
            }
            db = database;
        }
    );
}

function findNextSequenceValue(cb) {
    db.collection("sequence").findAndModify(
        {_id: 'url_seq'},
        null,
        {$inc: {sequence_value: 1}},
        {new: true, upsert: true},
        function (err, doc) {
            cb(doc.value.sequence_value);
        }
    );
}

MongoDBBackend.prototype.add = function (url, cb) {
    findNextSequenceValue(function (sequence_value) {
            var id = encoder.encode(sequence_value);

            db.collection("url").insertOne(
                {
                    _id: id,
                    full_url: url
                },
                function (err, doc) {
                    cb(id)
                }
            );
        }
    );
};

MongoDBBackend.prototype.get = function (id, cb) {
    db.collection("url").find({_id: id}).limit(1).next(function(err, doc) {
        cb(doc ? doc.full_url : null);
    });
};

module.exports = MongoDBBackend;
