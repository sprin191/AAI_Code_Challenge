myApp.controller('LoginController', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window)
{

$scope.auth = {};

//Logs user into Proof API, then redirects to home page upon success.
$scope.logIn = function (authInfo) {
      $http.post('/proofAPI/login', authInfo)
        .then(function (response) {
          if (response.status == 200 ) {
            //console.log("success!", response);
            if (response.data.hasOwnProperty('errors')) {
            alert("Incorrect login credentials. Please try again.");
          } else {
            $window.location.href='#/home';
            $window.location.reload();
          }
        } else {
            console.log("login error");
          }
        });
};

}]);
