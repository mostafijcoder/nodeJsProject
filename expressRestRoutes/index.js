
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('nothing to see here');
});
app.get('/^\/[0-9]+$/', function(req, res) {
    res.send('this is a zip code');
});
app.get('/*', function(req, res) {
    res.send('this is a wildcard');
});
app.listen(3014, function() {
    console.log('Listening on port 3014');
});
/*
If you want to match a path prefix you can use the * 
placeholder to match anything after the prefix. You can also set up a route based on a regular expression */