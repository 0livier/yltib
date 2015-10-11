# API Node

## Run tests
./node_modules/mocha/bin/mocha spec.js --delay

## Run server
node server.js

## Curl commands
curl -X POST -H "Content-Type: application/json" -d '{"url":"http://cnn.com"}' http://0.0.0.0:3000/v1/urls
