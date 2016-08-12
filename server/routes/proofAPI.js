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

router.post('/add-video', function (req, res) {
console.log(req.body);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/videos',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: JSON.stringify(req.body)
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

router.post('/upVote/:id', function (req, res) {
var id = req.params.id;
console.log("upVote!", req.params.id);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/videos/' + req.params.id + '/votes',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: "{  \"opinion\": 1}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

router.post('/downVote/:id', function (req, res) {
var id = req.params.id;
console.log("downVote!", req.params.id);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/videos/' + req.params.id + '/votes',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: "{  \"opinion\": -1}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

router.post('/view', function (req, res) {
console.log("view!", req.body);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/views',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: JSON.stringify(req.body)
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
});

//Deletes errored video.
/*router.delete('/:id', function (req, res) {
var id = req.params.id;
console.log("delete" + id);
request({
  method: 'DELETE',
  url: 'https://proofapi.herokuapp.com/videos/' + req.params.id,
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
});*/



module.exports = router;
