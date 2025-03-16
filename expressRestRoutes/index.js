
var express = require('express');
var app = express();

app.route ('/')
    .all(function(req, res, next) {
        res.send('all\n');
        next();
    })
    .get(function(req, res, next) {
        res.send('get\n');
        next();
    })
    .post(function(req, res, next) {
        res.send('post\n');
        next();
    })
    .put(function(req, res, next) {
        res.send('put\n');
        next();
    })
    .delete(function(req, res, next) {
        res.send('delete\n');
        next();
    });
app.listen(3014);

/*
  app.route member function to specify the prefix only once, which returns a route object that 
has the same all/get/put/post/delete functions

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