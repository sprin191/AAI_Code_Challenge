myApp.controller('HeaderController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location)
{

$scope.showLogoutBtn = false;

checkLogin();

  //Logs user out.
  $scope.logout = function () {
    $http.delete('/proofAPI/logout')
    .then(function (response) {
      if (response.status == 200 ) {
        //console.log("logout success!");
        $scope.showLogoutBtn = false;
        $window.location.href='#/login';
      } else {
        console.log("logout error");
        return;
      }
    });
  };

  //Checks whether user is logged in, and shows/hides logout button accordingly.
  function checkLogin() {
    $http.get('/proofAPI/checkAuth')
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.status === true) {
            //console.log("success!", response);
            $scope.showLogoutBtn = true;
          }
          else {
            $scope.showLogoutBtn = false;
          }
        } else {
          console.log("check login error");
          return;
        }
      });
  }

}]);
