const https = require('https');
const fs = require('fs');

// So, having a public key shared makes it secure to start a conversation with the server. How can you securely talk back? Simple. The user (the browser basically) generates a pre-master secret on the fly and sends it to the server securely in an encrypted message (encrypted with the server public key). The pre-master secret is used to generate a session key, which is only valid for this session between the client and the server. Now the server and the client can talk to each other if they encrypt the messages with this shared session key.This is the simplified description of the SSL (or the newer version called TLS) handshake. After the handshake, the actual standard HTTP conversation takes place where the entire HTTP message (including headers) is encrypted using a session key. HTTPS is simply HTTP communication over an SSL secured communication channel

// go to cmd then write the following command to generate the private key and public key
/*
openssl genrsa -out key.pem 2048 -> privatekey generation through openssl
openssl req -x509 -new -key key.pem > cert.pem -> publickey

go to the path C:\Users\Administrator you will find the key.pem and cert.pem

*/

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
  };
  https.createServer(options, function (req, res) {
     res.end('hello client!');
  }).listen(3013)
