/**
*  Module
*  IPCotroller control page ip.html
*  
*/
'use strict';
angular.module('cronusweb').controller('IPController', function($scope, $rootScope, $location, $http, $window, MyIPService, UserLoginService){
	// set oldUrl
	$rootScope.oldUrl = $location.url();
    $scope.isUserLogin = UserLoginService.getUser();
	// console.log($rootScope.oldUrl);
    MyIPService.getAllIP().success(function(data, status, headers, config){
     // console.log(data);
       $scope.ipData = data;
    }).error(function(data, status, headers, config){
       alert("Internal Error");
    });
    
    $scope.editIP = function ($index,data) {
        if (confirm('Are you want to update description IP: '+ data.ip_address)) {
            MyIPService.updateDescriptionIP(data).success(function(data, status, headers, config){
                if (data.status){
                   alert("Update success.");
                }else{
                   alert("Update fail.");
                }  
            }).error(function(data, status, headers, config){
                alert("Internal Error");
            });
        } else {
            $scope.cancel () ;
        } 
    };
    $scope.cancel = function () {
        MyIPService.getAllIP().success(function(data, status, headers, config){
            // console.log(data);
            $scope.ipData = data;
        }).error(function(data, status, headers, config){
    
        });
    } 
    $scope.borrowIP = function ($index,data) {
        if (confirm('Are you want to borrow IP : '+ data.ip_address)) {
            var postData = {};
            postData.id = data.id;
            postData.ip_address = data.ip_address;
            postData.uid = $scope.isUserLogin.username;
          //  console.log(postData);
            MyIPService.borrowIP(postData).success(function(data, status, headers, config){
                if (data.status){
                    $scope.ipData[$index].uid =  $scope.isUserLogin.username;
                    alert("Borrow success.");
                }else{
                     alert("Borrow fail.");
                }    
            }).error(function(data, status, headers, config){
                alert("Internal Error");
            });
        }
    }
    $scope.retrunIP = function ($index,data) {
        if (confirm('Are you want to return IP : '+ data.ip_address)) {
       
            var postData = {};
            postData.id = data.id;
            postData.ip_address = data.ip_address;
            postData.uid = 'NULL';
           // console.log(postData);
            MyIPService.returnIP(postData).success(function(data, status, headers, config){
                if (data.status){
                    $scope.ipData[$index].uid =  'NULL';
                    alert("Return success.");
                }else{
                     alert("Return fail.");
                }
            }).error(function(data, status, headers, config){
                alert("Internal Error");
            }); 
        }
    } 
});

angular.module('cronusweb').service('MyIPService', function($http){ 
    this.getAllIP = function() {
        var configHTTP = {
            url: '/api/ip/getip.htm',
            method: 'get',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            }
        };
        return $http(configHTTP);
    }
    this.borrowIP  = function (data) {
        var configHTTP = {
            url: '/api/ip/borrowip.htm',
            method: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: data 
        };
        return $http(configHTTP);
    }
    this.returnIP  = function (data) {
        var configHTTP = {
            url: '/api/ip/returnip.htm',
            method: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: data 
        };
        return $http(configHTTP);
    }
    this.updateDescriptionIP  = function (data) {
        var configHTTP = {
            url: '/api/ip/updatedescriptionip.htm',
            method: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: data 
        };
        return $http(configHTTP);
    }
});