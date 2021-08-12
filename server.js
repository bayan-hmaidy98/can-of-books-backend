'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const JWKSURI = process.env.JWKSURI
const app = express();
app.use(cors());
const mongoose = require("mongoose");
const client = jwksClient({
  jwksUri: JWKSURI,
}) // to send request to Auth0
const {seedUserData} = require('./models/user.model');
const {getBooks} = require('./controller/books.controller');
const {createNewBook} = require('./controller/books.controller');
const {deleteBook}= require('./controller/books.controller');

const PORT = process.env.PORT || 3001;
mongoose.connect("mongodb://localhost:27017/books", { useNewUrlParser: true, useUnifiedTopology: true });
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
const token = request.headers.authorization.split(' ')[1];``
console.log(request.headers);
response.send('got the token');
jwt.verify(token, getKey, {}, (error, user) => {
  if(error){
    response.send('Your token is invalid')
  }
  response.json(user)
})
})

seedUserData();

app.get('/books',getBooks);
app.post('/book',createNewBook);
app.delete('/book/:book_id', deleteBook);


app.listen(PORT, () => console.log(`listening on ${PORT}`));

