
var express = require('express');
var app = express();

app.param('id', function(req, res, next, id) {
    console.log('CALLED ONLY ONCE with', id);
    res.write('Request URL: ' + req.originalUrl + '\n');
    res.write('ID: ' + id + '\n');
    req.user={id:id,name:'user'+  id};
    next();
});
app.get('/user/:id', function(req, res) {
    res.write('Request URL: ' + req.originalUrl + '\n');
    res.write('ID: ' + req.params.id + '\n');
    res.write('User: ' + req.user.name + '\n');
    res.end();
});

app.listen(3014, function() {
    console.log('Listening on port 3014');
});
/*
In fact, by using the app.param function, you can register a middleware to load the relevant information for you. The app.param middleware function is called whenever a parameter name matches in a route and is also passed in the parameter value as a fourth argument. */