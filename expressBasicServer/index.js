
var express = require('express');
 var timeout = require('connect-timeout');
 var app = express()
    .use('/api', timeout(5000),
                function (req, res, next) {
 // simulate a hanging request by doing nothing
                }
                , function (error, req, res, next) {
                  if (req.timedout) {
                      res.statusCode = 500;
                      res.end('Request timed out');
                  }
                  else {
                      next(error);
                  }
              })
   
    .listen(3014);

/*
    Time-out Hanging Requests
 It is possible to get in a situation where some middleware fails to end the request and fails to call next. For example, this can happen if your database server is down and your middleware is waiting for a response from the database server. In such a case, the client HTTP request will be left hanging, taking up server memory. In these circumstances, you should time-out the client request instead of leaving it hanging.This is exactly what the connect-timeout (npm install connect-timeout) middleware is for */
/*
 If you start this webserver and visit http://localhost:3000/api, the request will hang for five seconds, after which the connect-timeout middleware kicks in and terminates the request, sending the client a 503 Service Unavailable HTTP response.
 You can customize the response of a timeout by adding an error handling middleware and checking if a timeout occurred by checking the req.timedout property. */
