/**
*  Module
*  HomeCotroller control page home.html
*  
*/
'use strict';
angular.module('cronusweb').controller('HomeCotroller', function($scope, $rootScope, $location, $http, $window){
	// set oldUrl
	$rootScope.oldUrl = $location.url();
	// console.log($rootScope.oldUrl);

});