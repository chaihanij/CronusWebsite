/**
*  Module
*  LabCotroller control page lab.html
*  
*/
'use strict';
angular.module('cronusweb').controller('LabController', function($scope, $rootScope, $location, $http, $window, UserLoginService){
    // set oldUrl
    $rootScope.oldUrl = $location.url();
    $scope.isUserLogin = UserLoginService.getUser();
    // console.log($scope.isUserLogin);

    $http.get('/api/lab/getlistlab.htm').success(function (data, status, headers, config) {
        console.log(data);
        $scope.labData = data;
    }).error(function (data, status, headers, config) {
        console.log(data);
    });

    $scope.borrowLab = function (index,data) {

        if (confirm('Are you want to borrow lab ip '+ data.ip_address)) {
            var dataPOST = {}; 
            dataPOST.user = $scope.isUserLogin;
            dataPOST.lab = data;
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
                    $scope.labData[index].uid = $scope.isUserLogin.username;
                }
            }).error(function (data, status, headers, config) {
                console.log(data);
            });  
        }
    };

    $scope.retrunLab = function (index,data) {
        if (confirm('Are you want to return lab ip '+ data.ip_address)) {
            var dat
            var dataPOST = {}; 
            dataPOST.user = $scope.isUserLogin;
            dataPOST.lab = data;
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
                    $scope.labData[index].uid = "";
                }
            }).error(function (data, status, headers, config) {
                console.log(data);
            });  
        } 
    };
    $scope.viewDescriptionLab = function(data){
        $rootScope.LabData = data;
        // console.log(data);
        var urlData = {};
        urlData.id = data.id;
        urlData.ip = data.ip_address;

        $location.path("/Lab/description").search(urlData);
    };
});