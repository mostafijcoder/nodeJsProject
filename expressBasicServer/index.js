
var express = require('express');
 var cookieParser = require('cookie-parser');
 var app = express()
    .use(cookieParser())
    .use(function (req, res) {
        if (req.cookies.name) {
            console.log('User name:', req.cookies.name);
        }
        else {
        res.cookie('name', 'foo');
        }
        res.end('Hello!');
    })
    .listen(30014);

/*
    A cookie is some data sent from the web server and stored in the user’s web browser. Every time the user’s browser makes a request to the web server, the web browser will send back the cookie that it received from the server. Cookiesprovide a great foundation for creating user sessions.
    The Express response object contains a few useful member functions to set client cookies. To set a cookie, call res.cookie(cookieName,value,[options]) function. For example, the code in Listing 7-9 will set a cookie called 'name' to 'foo':

    If this response was handled by the browser, then that browser would always send the cookie called ‘name’ with value ‘foo’ if the path on the server starts with ‘/’ . The cookie is sent in the ‘cookie’ header by the client. In Listing 7-11, modify our server to log any cookies sent in the client request.
    While the header is useful, you need something to parse this into a JavaScript object. That’s where the cookieparser (npm install cookie-parser) middleware comes in. Put this middleware in your queue and it populates the parsed cookies into the ‘req.cookies’ object, as shown in Listing 7-12, to demonstrate its usage. */