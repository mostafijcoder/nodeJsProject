const http = require('http');
const express = require('express');
const serveStatic= require('serve-static');

// create an express app
const app = express()
// register a middleware
            .use (serveStatic(__dirname + '/public'))
               // Register the app with the http server
http.createServer(app).listen(3014, () => {
    console.log('Server started at http://localhost:3014');
}
);
