/**
*  Module
*  IPCotroller control page ip.html
*  
*/
'use strict';
angular.module('cronusweb').controller('IPCotroller', function($scope, $rootScope, $location, $http, $window, AuthService){
	// set oldUrl
	$rootScope.oldUrl = $location.url();
	// console.log($rootScope.oldUrl);

});