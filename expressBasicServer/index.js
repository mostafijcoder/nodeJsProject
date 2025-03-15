const http = require('http');
const express = require('express');

// create an express app
const app = express()
// register a middleware
            .use ((req, res, next) => {
                console.log('middleware');
                res.send('Hello World');
               });

               // Register the app with the http server
http.createServer(app).listen(3014, () => {
    console.log('Server started at http://localhost:3014');
}
);
