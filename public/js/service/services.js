angular.module('cronusweb').service('UserLoginService', function(){
    var profile = {};
   
    this.getUser = function () {
        return profile;
    }
    this.setUser = function () {
         profile = {};
    }
    this.setUser = function (data) {      
        if ( data != undefined && data != null) {  
            profile = data;
        } else {
            profile = {};
        }
    }
});
angular.module('cronusweb').service('AuthService', [ function () {
        
        var userIsAuthenticated = false;

        this.setUserAuthenticated = function(value) {
            userIsAuthenticated = value;
        };

        this.getUserAuthenticated = function() {
            return userIsAuthenticated;
        };
        
        return this;
    }]
);
