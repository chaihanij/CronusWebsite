/**
 * @author      Wachirawat Chaihanij <ch.wachirawat@gmail.com>
 * @version     0.0.0               (current version number of program)
 * @since       2014-11-26          (the version of the package this class was first added to)
 */
'use strict';
function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
};
var cronusweb = {};
var cronusweb = angular.module('cronusweb', ['ngRoute', 'ngResource', 'ui.bootstrap']);
cronusweb.factory('authInterceptor', function ($q, $window, $location, $rootScope, UserLoginService ,AuthService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if(rejection.status === 401 || rejection.status === 403) {
          if ( rejection.statusText  === "Unauthorized" ){
              UserLoginService.setUser();
              AuthService.setUserAuthenticated(false);
              delete $window.sessionStorage.token;
              alert('Please Login');
              $location.path('/Login');
          }           
      } else {
          // console.log(rejection);
          $rootScope.erroeCode = rejection.status;
          $rootScope.erroeMessage = rejection.statusText;
          // alert("err code "+ rejection.status);
          $location.path('/Error');
      }
      return $q.reject(rejection);
    }
  };
});
cronusweb.run(['$rootScope', 'AuthService', '$location', function($rootScope, AuthService, $location){
        // Everytime the route in our app changes check auth status
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            // if you're logged out send to login page.
            if (next.requireLogin && !AuthService.getUserAuthenticated()) {
                $location.path('/Login');
                event.preventDefault();
            }
        });
}]);
cronusweb.config(function ($routeProvider, $locationProvider, $httpProvider) { 
    $routeProvider.when('/Home', {
        templateUrl: '/partials/home',
        controller: 'HomeController',
        requireLogin: false
    }).when('/Login',{
    	  templateUrl: '/partials/login',
        controller: 'MainCtrl',
        requireLogin: false
    }).when('/IP',{
        templateUrl: '/partials/ip',
        controller: 'IPController',
        requireLogin: true
    }).when('/Document',{
        templateUrl: '/partials/doc',
        controller: 'DocController',
        requireLogin: true
    }).when('/Lab',{
        templateUrl: '/partials/lab',
        controller: 'LabController',
        requireLogin: true
    }).when('/Error',{
        templateUrl: '/partials/error',
        controller: 'MainCtrl',
        requireLogin: false
    }).when('/Setting',{
        templateUrl: '/partials/setting',
        controller: 'MainCtrl',
        requireLogin: true
    }).when('/Lab/description',{
        templateUrl: '/partials/descriptionlab',
        controller: 'DesController',
        requireLogin: true
    });
    $routeProvider.otherwise({
        redirectTo: '/Home'
    });
    $httpProvider.interceptors.push('authInterceptor');
});
cronusweb.controller('MainCtrl', function ($scope, $rootScope,$location, $window, $http, UserLoginService, AuthService) {
  	$scope.isUserLogin = UserLoginService.getUser();
    if ($window.sessionStorage.token != 'undefined' && $window.sessionStorage.token != null ){
        var dataProfile = JSON.parse(url_base64_decode($window.sessionStorage.token.split('.')[1]));
        UserLoginService.setUser(dataProfile);
        AuthService.setUserAuthenticated(true);
    }

    $scope.$watch(function () { 
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path(); 
        };
        $scope.isLoggedIn = function () {
          return AuthService.getUserAuthenticated();
        };
        $scope.isUserLogin = UserLoginService.getUser();
    });

    // function login 
    $scope.attemptLogin = function (credentials) {
        var url = $rootScope.oldUrl;
        $http.post('/login.htm', credentials).success(function (data, status, headers, config) {
  	        if (data.token != undefined && data.token != null) {
  	            $window.sessionStorage.token = data.token;
  	            var dataProfile = JSON.parse(url_base64_decode(data.token.split('.')[1]));
  	            UserLoginService.setUser(dataProfile);
  	            AuthService.setUserAuthenticated(true);
  	            if (url != null && url != undefined){
                    $location.path (url);
                } else {
                    $location.path ('/home');
                }
  	        } else {
  	            $scope.dataLogin = data;
  	            AuthService.setUserAuthenticated(false);
  	        } 
  	    }).error(function (data, status, headers, config) {
  	        // Erase the token if the user fails to log in
  	        // UserLoginService.setUser();
  	        AuthService.setUserAuthenticated(false);
  	        delete $window.sessionStorage.token;
	    });
	  };
	   // function logout 
    $scope.logout = function () {
      UserLoginService.setUser();
      AuthService.setUserAuthenticated(false);
      delete $window.sessionStorage.token;
      $location.path('/Login');
    };

    $scope.erroeCode =  $rootScope.erroeCode;
    $scope.erroeMessage =  $rootScope.erroeMessage;
    if ($rootScope.erroeCode == null || $rootScope.erroeCode == undefined ||  $rootScope.erroeMessage == null || $rootScope.erroeMessage == undefined) {
        $scope.erroeCode =  500;
        $scope.erroeMessage = "Internal Error"
    }
  
});