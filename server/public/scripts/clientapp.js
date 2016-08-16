var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "HomeController"
    })

    .when('/login', {
      templateUrl: '/views/login.html',
      controller: "LoginController"
    })

    .otherwise({
      redirectTo: '/login'
    });

}
]);
