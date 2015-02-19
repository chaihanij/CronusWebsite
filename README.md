# CronusWebsite
$rootScope.oldUrl = $location.url();
	$scope.isUserLogin = UserLoginService.getUser();
	var oldData;


	var searchObject = $location.search();
 	if (searchObject == undefined) {
       	$location.path('/Error');
    }
  	var configHTTP = {
  		url: '/api/lab/getlab.htm',
      	method: 'POST',
       	dataType: 'json',
      	headers: {
           	"Content-Type": "application/json"
       	},
       	data: searchObject 
   	};
	$http(configHTTP).success(function (data, status, headers, config) {
   		oldData = data;
  		$scope.data = data;
  		console.log($scope.data);
	}).error(function (data, status, headers, config) {	
	
	});
	console.log(oldData);
    $scope.borrowLab = function () {

 		if (confirm('Are you want to borrow lab ip '+ $scope.data.ip_address)) {
 			var dataPOST = {}; 
 			dataPOST.user = $scope.isUserLogin;
 			dataPOST.lab =  $scope.data;
 			var configHTTP = {
       	 		url: '/api/lab/borrowlab.htm',
              	method: 'POST',
               	dataType: 'json',
              	headers: {
                   	"Content-Type": "application/json"
               	},
               	data: dataPOST 
           	};
 			$http(configHTTP).success(function (data, status, headers, config) {
 	   			if (data.status) {
 	   				$scope.data.uid = $scope.isUserLogin.username;
 	   			}
 			}).error(function (data, status, headers, config) {
 	  			console.log(data);
 			});  
 		}
 	};

	$scope.retrunLab = function () {
 		if (confirm('Are you want to return lab ip '+ $scope.data.ip_address)) {
  			var dataPOST = {}; 
 			dataPOST.user = $scope.isUserLogin;
 			dataPOST.lab = $scope.data; 
 			console.log();
 			var configHTTP = {
       	 		url: '/api/lab/returnlab.htm',
              	method: 'POST',
               	dataType: 'json',
              	headers: {
                   	"Content-Type": "application/json"
               	},
               	data: dataPOST 
           	};
 			$http(configHTTP).success(function (data, status, headers, config) {
 	   			if (data.status) {
 	   				$scope.data.uid = "";
 	   			}
 			}).error(function (data, status, headers, config) {
 	  			console.log(data);
 			});  
 		} 
 	};

 	$scope.editLab = function (data) {
  		if (confirm('Are you want to update data ?')) {
  			var dataPOST = {}; 
 			dataPOST.user = $scope.isUserLogin;
 			dataPOST.lab = $scope.data; 
 			console.log();
 			var configHTTP = {
       	 		url: '/api/lab/updatelab.htm',
              	method: 'POST',
               	dataType: 'json',
              	headers: {
                   	"Content-Type": "application/json"
               	},
               	data: dataPOST 
           	};
 			$http(configHTTP).success(function (data, status, headers, config) {
 	   		
 			}).error(function (data, status, headers, config) {
 	  			
 			});  
 		} 
 	};
  