var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      redirectTo: 'shelf'
    })
    .when('/shelf', {
      templateUrl: '/views/templates/shelf.html',
      controller: 'ShelfController as vm', //Uses ShelfContoller
    })
    .when('/login', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as vm', //Uses LoginContoller
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html', 
      controller: 'LoginController as vm'   // Uses LoginController
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',  //Uses UserController
      resolve: {
        getuser: function (UserService) {  //Only useable by someone who is logged in
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser: function (UserService) {    //Only useable by someone who is logged in
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
