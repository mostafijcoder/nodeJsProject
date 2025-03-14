const http = require('http');
const connect = require('connect');

//Chaining Sample: Verifying Requests/Restricting Access.Because we need to explicitly pass control onto the next middleware by calling next, we can optionally stop execution from proceeding at any time by not calling next and terminating the response ourselves (res.end)
// Let’s implement a basic access authorization middleware that returns 401 NOT AUTHORIZED if the client request does not have the correct credentials. Basic authorization is a simple standardized protocol where every client request needs to contain an Authorization header. The header needs to be constructed as 
/*Username and password are combined into a string: “username:password”
The resulting string literal is then encoded using Base64.
The authorization method and a space, that is, “Basic” is then put before the encoded string.
 An example client header would be Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==.
 Additionally, to inform the client that it needs to add an Authorization header, the server should send a  
WWW-Authenticate header in the response on rejecting a client request */
function authorize(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    res.end('Unauthorized');
    return;
  }
  var authMiddleware = new Buffer.from(auth.split(' ')[1], 'base64')
    .toString()
    .split(':');
    const username = authMiddleware[0];
    const password = authMiddleware[1];
  if (username === 'admin' && password === 'passwordd') {
    next();
  } else {
    res.statusCode = 403;
    res.end('Forbidden');
  }
  }
// As a demo, this middleware only accepts username = foo and password = bar at the moment, but we can easily make it configurable if we want to. Notice that we only call next() if the access is authorized so it can be used to provide protection against bad credentials
// The middleware is then used in a connect server that listens on port 3010

/*app.use(authorize)
  .use((req, res) => {
    res.end('Authorized');
  }); */

// If you try to access the server without providing the correct credentials, you will get a 401 NOT AUTHORIZED response with a WWW-Authenticate header, as shown in the following example:
// $ curl http://localhost:3010/user -i password:password
//We can reuse this authentication middleware to restrict specific areas only. For example, we can restrict access to the /admin path by adding a new middleware that checks the request URL and only calls the authorization middleware if the request URL starts with /admin. If the request URL does not start with /admin, we can simply pass control to the next middleware. This is a good example of how we can use middleware to restrict access to specific areas of our application.
// The following code demonstrates how to restrict access to the /admin path:



// Create Connect app
const app = connect();

// Restrict access to /admin
app.use((req, res, next) => {
    if (req.url.startsWith('/admin')) {
        authorize(req, res, next);
    } else {
        next();
    }
});

// Middleware for /admin route
app.use('/admin', (req, res) => {
    res.end('Welcome to Admin Area!');
});

// Middleware for public area
app.use((req, res) => {
    res.end('Welcome to Public Area!');
});

// Create & Start HTTP Server
http.createServer(app).listen(3011, () => {
    console.log('Server running on http://localhost:3011');
});