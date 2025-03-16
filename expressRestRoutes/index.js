
var express = require('express');
var app = express();

app.get('/user/:userId', function(req, res) {
    res.send('userId is set to ' + req.params['userId']);
});
app.get('/user/:userId/role/:roleId', function(req, res) {
    res.send('userId is set to ' + req.params['userId'] + ' and roleId is set to ' + req.params['roleId']);
});
app.get('/flights/:from-:to', function(req, res) {
    res.send('from is set to ' + req.params['from'] + ' and to is set to ' + req.params['to']);
});

app.listen(3014, function() {
    console.log('Listening on port 3014');
});
/*
Instead of putting too much filtering logic into your path prefix matching, a much nicer option is to use path 
parameters. You can specify path parameters using the :parameterName syntax. For example `/user/:userId` will 
match `/user/123` and populate the userId request parameter for you. Express puts all the parameter values in  
req.params object */