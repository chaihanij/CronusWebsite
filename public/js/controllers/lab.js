/**
*  Module
*  LabCotroller control page lab.html
*  
*/
'use strict';
angular.module('cronusweb').controller('LabCotroller', function($scope, $rootScope, $location, $http, $window){
	// set oldUrl
	$rootScope.oldUrl = $location.url();
	// console.log($rootScope.oldUrl);

});