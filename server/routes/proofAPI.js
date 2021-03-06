var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

var authToken = undefined;
var email = undefined;

router.post('/login', function (req, res) {
  console.log("LOGIN", req.body);
  email = req.body.email;
  request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/sessions',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(req.body)
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  var authResponse = JSON.parse(body);
  if (authResponse.hasOwnProperty('errors')) {
    res.send(body);
  } else {
    authToken = authResponse.data.attributes.auth_token;
    //console.log("HERE", authToken);
    res.send(body);
  }
});
});

router.get('/checkAuth', function (req, res) {
  //console.log("HERE - user: " , authToken);
    if (authToken !== undefined) {
      //console.log('authenticated ', authToken);
      res.json({ status: true, email: email});
    } else {
      res.json({ status: false });
    }
});

router.delete('/logout', function (req, res) {
  //console.log("HERE - user: " , authToken);
  request({
method: 'DELETE',
url: 'https://proofapi.herokuapp.com/sessions/' + authToken,
headers: {
  'Content-Type': 'application/json',
  'X-Auth-Token': authToken
}}, function (error, response, body) {
console.log('Status:', response.statusCode);
console.log('Headers:', JSON.stringify(response.headers));
console.log('Response:', body);
authToken = undefined;
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
//console.log(req.body);
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
//console.log("upVote!", req.params.id);
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
//console.log("downVote!", req.params.id);
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
//console.log("view!", req.body);
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
  res.send(body);
});
});

module.exports = router;
