/**
*  Module
*  DocCotroller control page doc.js
*  
*/
'use strict';
angular.module('cronusweb').controller('DocController', 
function($scope, $rootScope, $location, $http, $window, $modal, $log, UserLoginService){
	  // set oldUrl
   	$rootScope.oldUrl = $location.url();
   	$scope.isUserLogin = UserLoginService.getUser();
   	var userLogin = UserLoginService.getUser();
   	// console.log(userLogin);
   	$scope.userLogin = userLogin;
   	var catalogings;
   	var urlPath = [ "Home" ];
    $scope.urlPath = urlPath;
   	$http.get('api/documnet/home.htm').success(function (data, status, headers, config) {
           catalogings = data.Listfiles;
           urlPath = data.urlPath
           $scope.urlPath = urlPath;
           $scope.catalogings = catalogings;
       }).error(function (data, status, headers, config) {
        	
        	 console.log(status);
       });  

       $scope.onclickPath = function(index) {
           var strPaths= [] ;      
           if ( index == 0  ) {
               strPaths.push("Home");
           } else {
               var i = 0
               do {
                   strPaths.push($scope.urlPath[i]);
                   i++;
               } while(index >= i);
           }
           var configHTTP = {
               url: 'api/documnet/getfolderfromurl.htm',
               method: 'POST',
               dataType: 'json',
               headers: {
                   "Content-Type": "application/json"
               },
               data: strPaths
           };
          $http(configHTTP).success(function (data, status, headers, config) {
              catalogings = data.Listfiles;
              urlPath = data.urlPath
               // console.log(data);
              $scope.urlPath = urlPath;
           	  $scope.catalogings = catalogings;
          }).error(function (data, status, headers, config) {
               
          });
       };   

       $scope.catalogingClick = function (cataloging) {
       	 if ( cataloging.kind == "folder" ){
               kindFolder(cataloging);
          } else {
               kindFile(cataloging);
          }
       }
       function kindFolder(cataloging){
       	var dataFolder  = {};
       	dataFolder.folder = cataloging;
           dataFolder.user = UserLoginService.getUser();
       	var configHTTP = {
       	 	url: 'api/documnet/folder.htm',
               method: 'POST',
               dataType: 'json',
               headers: {
                   "Content-Type": "application/json"
               },
               data: dataFolder 
           };
           $http(configHTTP).success(function (data, status, headers, config) {
              catalogings = data.Listfiles;
           	  urlPath = data.urlPath
              console.log(data);
              $scope.urlPath = urlPath;
           	  $scope.catalogings = catalogings;
           }).error(function (data, status, headers, config) {
               
           });
       }
       function kindFile(cataloging){
       	console.log(cataloging);
       }
       $scope.download = function (cataloging) {    

   		$window.open(cataloging.urlpath.replace('public/',''));   
   	};  

   	$scope.moveToTrash = function (index,cataloging) {
   		// console.log(index);
   		if (confirm('Are you sure you want to delete '+ cataloging.name)) {
     			var dataFolder  = {};
     			dataFolder.folder = cataloging;
     			dataFolder.urlpath = $scope.urlPath;
     			var configHTTP = {
       	 		url: 'api/documnet/removefile.htm',
              		method: 'POST',
               	dataType: 'json',
              		 headers: {
                   "Content-Type": "application/json"
               },
               	data: dataFolder 
           	};
           	$http(configHTTP).success(function (data, status, headers, config) {
             		if (data.code == true) {
             			var newCatalogings = [];
             			for (var i = 0 ;i < $scope.catalogings.length  ;i ++ ){
             				console.log(cataloging.name , $scope.catalogings[i].name);
             				if (cataloging.name != $scope.catalogings[i].name) {
             					console.log($scope.catalogings[i]);
             					newCatalogings.push($scope.catalogings[i]);
             				}
             			}
             			$scope.catalogings = newCatalogings;
               	}
           	}).error(function (data, status, headers, config) {
               	alert('Delete file \'' + cataloging.name +'\' error.');
          		});
   		}
   	};
   	$scope.editName = function (index,cataloging) {   

   		var editName = prompt("Are you sure you want to rename \'"+ cataloging.name +"\' ?", cataloging.name);
   		if (editName != null && editName.trim() != ""){
   			if(editName != cataloging.name){
   				var dataFolder  = {};
   	  			dataFolder.folder = cataloging;
   	  			dataFolder.newName = editName;
   	  			var configHTTP = {
   	    	 		url: 'api/documnet/renamefile.htm',
   	           		method: 'POST',
   	            	dataType: 'json',
   	          		headers: {
   	               		"Content-Type": "application/json"
   	           		},
   	            	data: dataFolder 
   	        	};
   	        	$http(configHTTP).success(function (data, status, headers, config) {
   	          		// console.log(data);
   	          		if (data.code == true) {
   	           			for (var i = 0 ;i < $scope.catalogings.length  ;i ++ ){
   	           				// console.log(cataloging.name == $scope.catalogings[i].name);
   	           				if (cataloging.name == $scope.catalogings[i].name) {
   	          					$scope.catalogings[i].name = editName;          				
   	          				}
   	          			}
   	          		}
   	        	}).error(function (data, status, headers, config) {
   	            	alert('Delete file \'' + cataloging.name +'\' error.');
   	       		});
   			}
   		} 
   	};  

   	$scope.newFolder = function () {
   	   var url = "";
     		for (var i = 0; i < $scope.urlPath.length; i++) {
     			if( ($scope.urlPath.length -1 ) == i) {
     				url += $scope.urlPath[i];
     			} else {
     				url += urlPath[i]+"/";
     			}	
     		}
   		  var folderName = prompt("Are you sure you want to create folder in " + url + "?" , "");
         if (folderName != null && folderName.trim() != ""){ 
     		    var dataFolder  = {};
             dataFolder.foldername = folderName.trim();
             dataFolder.urlpath = url;
             var configHTTP = {
                 url: 'api/documnet/createfolder.htm',
                 method: 'POST',
                 dataType: 'json',
                 headers: {
                     "Content-Type": "application/json"
                 },
                 data: dataFolder 
             };
             $http(configHTTP).success(function (data, status, headers, config) {
                    $scope.catalogings.push(data);
             }).error(function (data, status, headers, config) {
                   alert('Create foler error.');
             });
         }
   	};  

    $scope.uploadFile = function () {
        // console.log($scope.urlPath);
        var modalInstance = $modal.open({
            templateUrl : 'UploadModalContent.html',
            controller : UploadController,
            resolve : {
              urlPath : function () {
                return $scope.urlPath;
              },
              userLogin : function () {
                return userLogin;
              }
            }
        });

        modalInstance.result.then(function(data) {
            var obj = JSON.parse(data);
            console.log(obj);
            for (var i = 0; i < obj.length; i++) {
              $scope.catalogings.push(obj[i]);
            }          
        },function(){});
    };

    // upload
    var UploadController = function ($scope, $rootScope, $modalInstance, $window, urlPath, userLogin) {
         console.log(userLogin);
        // console.log(urlPath);
        var url = "";
         for (var i = 0; i < urlPath.length; i++) {
            if( (urlPath.length -1 ) == i) {
              url += urlPath[i];
            } else {
              url += urlPath[i]+"/";
            } 
         }
        $scope.setFiles = function(element) {
            $scope.$apply(function(scope) {
            // console.log('files:', element.files);
            // Turn the FileList object into an Array
            $scope.files = [];
            for (var i = 0; i < element.files.length; i++) {
                $scope.files.push(element.files[i])
            }
            $scope.progressVisible = false
            });
        };
        $scope.upload = function (){
            $scope.progressVisible = true;
            var fd = new FormData();
            fd.append('url', url);
            fd.append('username', userLogin.username);
            fd.append('role', userLogin.role);
            for (var i in $scope.files) {
                fd.append("files", $scope.files[i]);
            }
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", uploadProgress, false);
            xhr.addEventListener("load", uploadComplete, false);
            xhr.addEventListener("error", uploadFailed, false);
            xhr.addEventListener("abort", uploadCanceled, false);
            xhr.open("POST", 'api/documnet/uploadfiles.htm',true);
           
            xhr.setRequestHeader('Authorization', 'Bearer ' + $window.sessionStorage.token);
            xhr.send(fd);
            function uploadProgress(evt) {
                $scope.$apply(function(){
                    if (evt.lengthComputable) {
                        $scope.progress = Math.round(evt.loaded * 100 / evt.total)
                    } else {
                        // $scope.progress = 'unable to computer'
                    }
                })
            }
            function uploadComplete(evt) {
                /* This event is raised when the server send back a response */
                // console.log(evt.target);
                // alert(evt.target.responseText);
                if (evt.target.statusText == "OK") {
                    var data = evt.target.response;
                    $modalInstance.close(data);
                } else {
                    alert('Upload file fail !');
                    $modalInstance.dismiss('cancel');
                }

                // $modalInstance.close();
            }
            function uploadFailed(evt) {
                alert("There was an error attempting to upload the file.");
            }
            function uploadCanceled(evt) {
                  alert("The upload has been canceled by the user or the browser dropped the connection.");
            }
        }
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
});
