myApp.controller('LoginController', ['$scope', '$http', '$location', '$window', '$sce', function($scope, $http, $location, $window, $sce)
{

$scope.auth = {};

//Logs user into Proof API.
$scope.logIn = function () {
      $http.post('/proofAPI/login', auth)
        .then(function (response) {
          if (response.status == 200 ) {
            console.log("success!");
            $window.location.href='/home';
          } else {
            console.log("error");
            return;
          }
        });
};

}]);
