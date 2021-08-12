'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const JWKSURI = process.env.JWKSURI
const app = express();
app.use(cors());
const client = jwksClient({
  jwksUri: JWKSURI,
}) // to send request to Auth0

const PORT = process.env.PORT || 3001;

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end
const token = request.headers.authorization.split(' ')[1];
console.log(request.headers);
response.send('got the token');
jwt.verify(token, getKey, {}, (error, user) => {
  if(error){
    response.send('Your token is invalid')
  }
  response.json(user)
})
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
