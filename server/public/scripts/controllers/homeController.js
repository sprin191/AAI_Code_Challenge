myApp.controller('HomeController', ['$scope', '$http', '$location', '$window',  function($scope, $http, $location, $window)
{

$scope.allVideos = [];
var auth = {};

logIn();

//Logs user into Proof API.
function logIn () {
      $http.post('/proofAPI/login/')
        .then(function (response) {
          if (response.status == 200 ) {
            auth.token = response.data.data.attributes.auth_token;
            console.log(auth.token);
            retrieveAllVideos();
          } else {
            console.log("error");
            return;
          }
        });
}

//Retrives all videos in the API.
function retrieveAllVideos() {
  console.log(auth);
  $http.get('/proofAPI/videos', auth)
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        $scope.allVideos = response.data.data;
      } else {
        console.log("error");
        return;
      }
    });
}

//Submits a new video.
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
