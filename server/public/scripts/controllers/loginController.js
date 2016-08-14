myApp.controller('LoginController', ['$scope', '$http', '$location', '$window', '$sce', function($scope, $http, $location, $window, $sce)
{

$scope.auth = {};

//Logs user into Proof API, then redirects to home page upon success.
$scope.logIn = function (authInfo) {
      $http.post('/proofAPI/login', authInfo)
        .then(function (response) {
          if (response.status == 200 ) {
            console.log("success!");
            $window.location.href='#/home';
          } else {
            console.log("error");
            return;
          }
        });
};

}]);
