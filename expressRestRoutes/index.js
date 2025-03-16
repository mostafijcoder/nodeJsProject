
var express = require('express');
var app = express();
app.all('/', function(req, res, next) {
    res.send('all\n');
    next();
});
app.get('/', function(req, res, next) {
    res.send('get\n');
    next();
});
app.post('/', function(req, res, next) {
    res.send('post\n');
    next();
});
app.put('/', function(req, res, next) {
    res.send('put\n');
    next();
});
app.delete('/', function(req, res, next) {
    res.send('delete\n');
    next();
});
app.listen(3014);

/*
 Express Application Routes 
Because of the importance of HTTP verbs when making good web APIs, Express provides first-class verb + URL based 
routing support.
 Let’s start with the basics. You can call app.get / app.put / app.post /app.delete—in other words,  
app.VERB(path, [callback...], callback)—to register a middleware chain that is only called when the path + 
HTTP verb in the client request matches. Also you can call app.all to register a middleware that is called whenever 
the path matches (irrespective of the HTTP verb)
All of these methods form a standard middleware chain where order + calling next matters. If you run this server 
you will note that the .all middleware is always called followed by the relevant verb middleware. We can test it by 
using curl and specifying the request (-X) verb to use

 $ curl http://127.0.0.1:3000
 all
 get
 $ curl -X PUT http://127.0.0.1:3000
 all
 put
 $ curl -X POST http://127.0.0.1:3000
 all
 post
 $ curl -X DELETE http://127.0.0.1:3000
 all
 delete */