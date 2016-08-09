var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

router.post('/login', function (req, res) {
  request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/sessions',
  headers: {
    'Content-Type': 'application/json'
  },
  body: "{  \"email\": \"hannahrspringer@gmail.com\",  \"password\": \"Lusian,epibolic,fortravail\"}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  var authResponse = JSON.parse(body);
  authToken = authResponse.data.attributes.auth_token;
  console.log("HERE", authToken);
  res.send(body);
});
});

router.get('/videos', function (req, res) {
request({
  method: 'GET',
  url: 'https://proofapi.herokuapp.com/videos?page&per_page',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

module.exports = router;
