myApp.controller('HomeController', ['$scope', '$http', '$location', '$window', '$sce', function($scope, $http, $location, $window, $sce)
{

$scope.video = {};
$scope.allVideos = [];
$scope.show1 = true;
$scope.show2 = false;
$scope.show3 = false;

logIn();

//Logs user into Proof API.
function logIn () {
      $http.post('/proofAPI/login/')
        .then(function (response) {
          if (response.status == 200 ) {
            console.log("success!");
            retrieveAllVideos();
          } else {
            console.log("error");
            return;
          }
        });
}

//Retrives all videos in the API.
function retrieveAllVideos() {
  $http.get('/proofAPI/videos')
    .then(function (response) {
      if (response.status == 200) {
        console.log(response);
        $scope.allVideos = response.data.data;
        for (i = 0; i < $scope.allVideos.length; i++) {
        //console.log($scope.allVideos[i].attributes.url);
        $scope.allVideos[i].attributes.url = $scope.allVideos[i].attributes.url.replace("watch?v=", "v/");
        $scope.allVideos[i].attributes.url = $scope.allVideos[i].attributes.url.replace("youtu.be/", "www.youtube.com/v/");
        $scope.allVideos[i].attributes.url = $scope.allVideos[i].attributes.url.replace("/vimeo.com/", "/player.vimeo.com/video/");
        $scope.allVideos[i].attributes.url = $sce.trustAsResourceUrl($scope.allVideos[i].attributes.url);
        //console.log($scope.allVideos[i].attributes.url);
      }
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

var body = {
  'title': $scope.video.title,
  'url': $scope.video.url,
  'slug': slug
};

$http.post('/proofAPI/add-video', body)
  .then(function (response) {
    if (response.status == 201 ) {
      console.log("success!");
      retrieveAllVideos();
    } else {
      console.log("error");
      return;
    }
  });
};

$scope.seeAll = function () {
  $scope.show1 = true;
  $scope.show2 = false;
  $scope.show3 = false;
};

$scope.views = function () {
  $scope.show1 = false;
  $scope.show2 = true;
  $scope.show3 = false;
};

$scope.votes = function () {
  $scope.show1 = false;
  $scope.show2 = false;
  $scope.show3 = true;
};

/*//Deletes errored video.
function deleteVid () {
var id = "575989a6-6d3d-429c-b1b6-7d2daca80185";
  $http.delete('/proofAPI/' + id)
    .then(function (response) {
      console.log("delete success!");
      return;
    });
}*/

}]);
