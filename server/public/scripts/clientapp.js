var myApp = angular.module('myApp', ['ngRoute', 'ngModal', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "HomeController"
    })

    .otherwise({
      redirectTo: '/home'
    });

}
]);
