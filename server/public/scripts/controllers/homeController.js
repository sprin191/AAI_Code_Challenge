myApp.controller('HomeController', ['$scope', '$http', '$location', '$window', '$sce', '$document', function($scope, $http, $location, $window, $sce, $document)
{

$scope.video = {};
$scope.allVideos = [];
$scope.show1 = true;
$scope.show2 = false;
$scope.show3 = false;

var email = undefined;

checkLogin();

//Shows all videos (ordered by most-least recently added in html), and hides other views.
$scope.seeAll = function () {
  $scope.show1 = true;
  $scope.show2 = false;
  $scope.show3 = false;
};

//Shows top 10 highest-viewed videos (in descending order in html), and hides other views.
$scope.views = function () {
  $scope.show1 = false;
  $scope.show2 = true;
  $scope.show3 = false;
};

//Shows top 10 highest-voted videos (in descending order in html), and hides other views.
$scope.votes = function () {
  $scope.show1 = false;
  $scope.show2 = false;
  $scope.show3 = true;
};

//Checks whether user is logged in. If logged in, retrieves all videos from API. If not, redirects to login page.
function checkLogin() {
  $http.get('/proofAPI/checkAuth')
    .then(function (response) {
      if (response.status == 200) {
        if (response.data.status === true) {
          console.log("success!", response);
          email = response.data.email;
          retrieveAllVideos();
        }
        else {
          //console.log(response);
          $window.location.href='#/login';
        }
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
        //For iFrame embedding: $scope.allVideos[i].attributes.url = $scope.allVideos[i].attributes.url.replace("watch?v=", "v/");
        //For iFrame embedding: $scope.allVideos[i].attributes.url = $scope.allVideos[i].attributes.url.replace("youtu.be/", "www.youtube.com/v/");
        $scope.allVideos[i].attributes.url = $scope.allVideos[i].attributes.url.replace("/vimeo.com/", "/player.vimeo.com/video/");
        $scope.allVideos[i].attributes.url = $sce.trustAsResourceUrl($scope.allVideos[i].attributes.url);
        $scope.allVideos[i].attributes.created_at = moment( new Date($scope.allVideos[i].attributes.created_at)).format('MM/DD/YYYY');
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
if (moment().isoWeekday() !== 6 && moment().isoWeekday() !== 7) {
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
    $scope.video = {};
    if (response.status == 200 ) {
      console.log("success!");
      retrieveAllVideos();
    } else {
      console.log("error");
      return;
    }
  });
} else {
  alert("Videos can only be added on business days. Please try again Monday-Friday.");
}
};

//Up-votes selected video by 1 if it is a business day, and the user has not yet voted that day.
$scope.upVote = function (video_id) {
  var id = video_id;
  var newVoteDate = moment().format('MM/DD/YYYY');
  var matchNumber = undefined;
  console.log(email);
  if (localStorage.getItem("lastVote") === null) {
    lastVoteDate = new Object;
    lastVoteDate.users = [];
    lastVoteDate.users.push({email : email});
    console.log(lastVoteDate);
  }
  else {
    lastVoteDate = JSON.parse(localStorage.getItem("lastVote"));
    var found = false;
    for (var i = 0; i < lastVoteDate.users.length; i++) {
      if (lastVoteDate.users[i].email === email) {
        found = true;
      }
    }
      if (found === false) {
        lastVoteDate.users.push({email : email});
      }
  }

    if (moment().isoWeekday() !== 6 && moment().isoWeekday() !== 7) {
      for (var j = 0; j < lastVoteDate.users.length; j++) {
        if (lastVoteDate.users[j].email === email) {
          matchNumber = j;
        }
      }
          if (lastVoteDate.users[matchNumber][id] === undefined || newVoteDate !== lastVoteDate.users[matchNumber][id]) {
              $http.post('/proofAPI/upVote/' + video_id)
              .then(function (response) {
                console.log(response);
                if (response.status == 200 ) {
                  console.log("success!");
                  console.log(id);
                  console.log(matchNumber);
                  lastVoteDate.users[matchNumber][id] = newVoteDate;
                  console.log(lastVoteDate.users[matchNumber][id]);
                  localStorage.setItem("lastVote", JSON.stringify(lastVoteDate));
                  console.log(lastVoteDate);
                  retrieveAllVideos();
                } else {
                  console.log("error");
                  return;
                }
              });
        } else {
          alert("You have already voted on this video once today. Please try again tomorrow.");
        }
  } else {
    alert("Voting is only available during business days. Please try again Monday-Friday.");
  }
};

//Down-votes selected video by 1 if it is a business day, and the user has not yet voted that day.
$scope.downVote = function (video_id) {
  var id = video_id;
  var newVoteDate = moment().format('MM/DD/YYYY');
  var matchNumber = undefined;
  console.log(email);
  if (localStorage.getItem("lastVote") === null) {
    lastVoteDate = new Object;
    lastVoteDate.users = [];
    lastVoteDate.users.push({email : email});
    console.log(lastVoteDate);
  }
  else {
    lastVoteDate = JSON.parse(localStorage.getItem("lastVote"));
    var found = false;
    for (var i = 0; i < lastVoteDate.users.length; i++) {
      if (lastVoteDate.users[i].email === email) {
        found = true;
      }
    }
      if (found === false) {
        lastVoteDate.users.push({email : email});
      }
  }

    if (moment().isoWeekday() !== 6 && moment().isoWeekday() !== 7) {
      for (var j = 0; j < lastVoteDate.users.length; j++) {
        if (lastVoteDate.users[j].email === email) {
          matchNumber = j;
        }
      }
          if (lastVoteDate.users[matchNumber][id] === undefined || newVoteDate !== lastVoteDate.users[matchNumber][id]) {
              $http.post('/proofAPI/downVote/' + video_id)
              .then(function (response) {
                console.log(response);
                if (response.status == 200 ) {
                  console.log("success!");
                  console.log(id);
                  console.log(matchNumber);
                  lastVoteDate.users[matchNumber][id] = newVoteDate;
                  console.log(lastVoteDate.users[matchNumber][id]);
                  localStorage.setItem("lastVote", JSON.stringify(lastVoteDate));
                  console.log(lastVoteDate);
                  retrieveAllVideos();
                } else {
                  console.log("error");
                  return;
                }
              });
        } else {
          alert("You have already voted on this video once today. Please try again tomorrow.");
        }
  } else {
    alert("Voting is only available during business days. Please try again Monday-Friday.");
  }
};

//Adds a view to the selected video's data (based on the video's ID).
$scope.addView = function (video_id) {
  //console.log("made it", video_id);
  var id = {
    'video_id': video_id
  };
  $http.post('/proofAPI/view', id)
    .then(function (response) {
      if (response.status == 200 ) {
        console.log("success!", response);
        //getViews();
        retrieveAllVideos();
      } else {
        console.log("error");
        return;
      }
    });
};

}]);
