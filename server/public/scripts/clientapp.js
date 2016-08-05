var myApp = angular.module('myApp', ['ngRoute', 'ngModal', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    .when('/admin', {
      templateUrl: '/views/admin.html',
      controller: "AdminController"
    })

    .otherwise({
      redirectTo: '/admin'
    });

}
]);
