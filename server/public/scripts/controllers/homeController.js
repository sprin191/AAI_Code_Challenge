myApp.controller('HomeController', ['$scope', '$http', '$location', '$window',  function($scope, $http, $location, $window)
{

$scope.video = {};

logIn();

//Logs user into Proof API.
function logIn () {
var request = new XMLHttpRequest();

request.open('POST', 'https://proofapi.herokuapp.com/sessions');

request.setRequestHeader('Content-Type', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
    var responseData = JSON.parse(this.responseText);
    authToken = responseData.data.attributes.auth_token;
    console.log(authToken);
  }
};

var body = {
  'email': 'hannahrspringer@gmail.com',
  'password': 'Lusian,epibolic,fortravail'
};

request.send(JSON.stringify(body));

}

//Submits video.
$scope.submitVideo = function () {

var slug = $scope.video.title.replace(/\s+/g, '-').toLowerCase();
console.log(slug);
console.log($scope.video);

var request = new XMLHttpRequest();

request.open('POST', 'https://proofapi.herokuapp.com/videos');

request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('X-Auth-Token', authToken);

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
  'title': $scope.video.title,
  'url': $scope.video.url,
  'slug': slug
};

request.send(JSON.stringify(body));
};

}]);
