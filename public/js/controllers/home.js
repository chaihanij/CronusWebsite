/**
*  Module
*  HomeCotroller control page home.html
*  
*/
'use strict';
angular.module('cronusweb').controller('HomeController', function($scope, $rootScope, $location, $http, $window){
	// set oldUrl
	$rootScope.oldUrl = $location.url();
	// console.log($rootScope.oldUrl);
	$scope.myInterval = 5000;
  	var slides = $scope.slides = [];
  	$scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    	slides.push({
      	image: 'http://placekitten.com/' + newWidth + '/300',
      	text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
   		});
 	};
 	for (var i=0; i<4; i++) {
    	$scope.addSlide();
  	}
});