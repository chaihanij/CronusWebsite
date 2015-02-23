/**
*  Module
*  DesController control page home.html
*  
*/
'use strict';
angular.module('cronusweb').controller('DesController', function($scope, $rootScope, $location, $http, $window, UserLoginService, MyGetLabService){
    $scope.isUserLogin = UserLoginService.getUser();
    var searchObject = $location.search();
    if (searchObject == undefined) {
        $location.path('/Error');
    }
    MyGetLabService.getLab(searchObject).success(function (data, status, headers, config) {
        $scope.data = data[0];
    }).error(function (data, status, headers, config) {
       
    });
    var tools = {
          "develop":[
              { "tools":"flex", "status":false, "version":"-" },
              { "tools":"gcc c/c++ compiler", "status":false, "version":"-" },
              { "tools":"redhat-rpm-config","status":false,"version":"-"},
              { "tools":"strace", "status":false, "version":"-"},
              { "tools":"rpm-build","status":false,"version":"-"},
              { "tools":"make","status":false,"version":"-"},
              { "tools":"pkgconfig","status":false,"version":"-"},
              { "tools":"gettext","status":false,"version":"-"},
              { "tools":"automake","status":false,"version":"-"},
              { "tools": "strace64","status":false,"version":"-"},
              { "tools":"gdb", "status":false,"version":"-"},
              { "tools":"bison","status":false,"version":"-"},
              { "tools":"libtool","status":false,"version":"-" },
              { "tools":"autoconf","status":false,"version":"-"},
              { "tools":"binutils","status":false,"version":"-" }
          ],
         "network":[
             { "tools":"netstat","status":false, "version":"-" },
             { "tools":"tcpdump","status":false, "version":"-"},
             { "tools":"ping" ,"status":false, "version":"-"},
             { "tools":"ifconfig","status":false, "version":"-"},
             { "tools": "ifup","status":false, "version":"-" },
             { "tools": "ifdown","status":false, "version":"-" },
             { "tools": "ifctg","status":false, "version":"-" },
             { "tools": "route","status":false, "version":"-" },
             { "tools":  "host","status":false, "version":"-" },
             { "tools":  "dig","status":false, "version":"-" },
             { "tools":  "wget","status":false, "version":"-" },
             { "tools":  "curl","status":false, "version":"-" },
             { "tools": "ssh","status":false, "version":"-" },
             { "tools": "scp","status":false, "version":"-" },
             { "tools": "sftp","status":false, "version":"-" }
         ],
         "equinox":[
             { "tools":"equinox","status":false, "version":"-" },
             { "tools":"equinoxAS","status":false, "version":"-" },
             { "tools":"minor","status":false, "version":"-" }
         ],
         "etc":[
             { "tools":"git","status":false, "version":"-" },
             { "tools":"git-reviwe","status":false, "version":"-" },
             { "tools":"svn","status":false, "version":"-" }
         ]
    };
    
    MyGetLabService.getTools(searchObject).success(function (data, status, headers, config) {   
        $scope.tools = data;  
    }).error(function (data, status, headers, config) {
       
    });
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
                    $scope.data.uid = $scope.isUserLogin.usertools;
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
                console.log(data);
            }).error(function (data, status, headers, config) {
                
            });  
        } else {
            $scope.cancal();
        }
    };
    $scope.cancal = function () {
        MyGetLabService.getLab(searchObject).success(function (data, status, headers, config) {
            $scope.data = data[0];
        }).error(function (data, status, headers, config) {
               
        });
    };

    $scope.addTools = function ( flags, tools) {
    
    if (tools != null && tools != undefined && tools.tools.trim() != '' ) {
        if (confirm('Are you want to add tools \"'+ tools.tools + '\" version \"' + tools.version + '\"')) {
            var flags = parseInt(flags);       
            tools.status = 1;
            switch (flags) {
                case 0:
                    // console.log("Develop Tools");
                    var flags = true ;
                    for(var i = 0 ; i < $scope.tools.develop.length ; i++ ){
                         if ( $scope.tools.develop[i].tools.trim() == tools.tools.trim() ){
                            flags = false;
                            break;
                         } 
                    }
                    if(flags) {
                        tools.type = "develop";
                        addTools(tools);
                        $scope.tools.develop.push(tools);
                        $scope.showdevelop = false;
                    } else {
                        alert ("Duplication name tools ?");
                    }                          
                    break;
                case 1:
                    // console.log("Network Tools");
                    var flags = true ;
                    for(var i = 0 ; i < $scope.tools.network.length ; i++ ){
                        if ( $scope.tools.network[i].tools.trim() == tools.tools.trim() ){
                            flags = false;
                            break;
                        } 
                    }
                    if(flags) {
                        tools.type = "network";
                        addTools(tools);
                        $scope.tools.network.push(tools);
                        $scope.shownetwork = false;
                    } else {
                        alert ("Duplication name tools ?");
                    }                 
                    break;
                case 2:
                    // console.log("Equinox Tools");
                    var flags = true ;
                    for(var i = 0 ; i < $scope.tools.equinox.length ; i++ ){
                        if ( $scope.tools.equinox[i].tools.trim() == tools.tools.trim() ){
                            flags = false;
                            break;
                        } 
                    }
                    if(flags) {
                        tools.type = "equinox";
                        addTools(tools);
                        $scope.tools.equinox.push(tools);
                        $scope.showequinox = false;
                    } else {
                        alert ("Duplication name tools ?");
                    }
                    break;
                case 3:
                    // console.log("ETC Tools");
                    var flags = true ;
                    for(var i = 0 ; i < $scope.tools.etc.length ; i++ ){
                        if ( $scope.tools.etc[i].tools.trim() == tools.tools.trim() ){
                            flags = false;
                            break;
                        } 
                    }
                    if(flags) {
                       tools.type = "etc";
                        addTools(tools);
                        $scope.tools.etc.push(tools);
                        $scope.showetc = false;
                    } else {
                        alert ("Duplication name tools ?");
                    }
                    break;
                };
        }
    } else {
        alert ("Please check 'name' and 'version' tools.")
    }
        function addTools (tools){
            MyGetLabService.getUpdateTools(searchObject, tools).success(function(data, status, headers, config){
                console.log(data);
            }).error(function(data, status, headers, config){
        
            });
        };
    };
    $scope.onUpdateToolStatus = function (tool){
        MyGetLabService.updateToolsStatus(searchObject,tool).success(function(data, status, headers, config){
            console.log(data);
        }).error(function(data, status, headers, config){
        
        });
    };
    
});

angular.module('cronusweb').service('MyGetLabService', function($http){
    this.getLab = function(searchObject) {
        var configHTTP = {
            url: 'api/lab/getlab.htm',
            method: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: searchObject 
        };
        return $http(configHTTP);
    }
    this.getTools = function(searchObject){
        var configHTTP = {
            url: 'api/lab/gettools.htm',
            method: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: searchObject 
        };
        return $http(configHTTP);
    }
    this.getUpdateTools = function(searchObject,tools){
        var data = {} ;
        data.searchObject =searchObject;
        data.tools = tools;
        var configHTTP = {
            url: 'api/lab/updatetools.htm',
            method: 'POST',
            dataType: 'json',
            headers: {
                "Content-Type": "application/json"
            },
            data: data 
        };
        return $http(configHTTP);
    }
    this.updateToolsStatus = function(searchObject,tools){
        var data = {} ;
        data.searchObject =searchObject;
        data.tools = tools;
        var configHTTP = {
            url: 'api/lab/updatetoolsstatus.htm',
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