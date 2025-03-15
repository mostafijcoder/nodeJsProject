var express = require('express');
var bodyParser = require('body-parser');
var app = express()
   .use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use(function (req, res) {
       if (req.body.foo) {
           res.end('Body parsed! Value of foo: ' + req.body.foo);
       }
       else {
           res.end('Body does not have foo!');
       }
   })
   .use(function (err, req, res, next) {
       res.end('Invalid body!');
   })
   .listen(3014);


   /*Body parsing is the act of parsing a string based client request body into a JavaScript object that you can easily consume in your application code. This is a very common task in web development, making the body-parser middleware (npm install body-parser) a must-have in your tool-belt. It simply does the following two things:
	
   Parses the request body into a JavaScript object if the 
  
   Puts this JavaScript object (if the parse was successful) in 
   content-type matches JSON 
   (application/JSON) or a user submitted HTML form (the browser sends it as the MIME type 
   application/x-www-form-urlencoded) middleware. */