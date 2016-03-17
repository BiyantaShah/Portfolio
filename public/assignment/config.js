(function(){
    'use strict';
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider

            .when("/home", {
                templateUrl: "client/views/home/home.view.html"
            })

            .when("/login", {
                templateUrl: "client/views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/profile", {
                templateUrl: "client/views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/register", {
                templateUrl: "client/views/users/register.view.html",
                controller:"RegisterController",
                controllerAs: "model"
            })

            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html"
            })

            .when("/forms", {
                templateUrl: "client/views/forms/forms.view.html",
                controller:"FormController"
            })

            .when("/fields", {
                templateUrl: "client/views/forms/fields.view.html"
            })



            .otherwise({
                redirectTo:"/home"
            })

        function checkLoggedIn(UserService, $q, $location) {

            var deferred = $q.defer();

            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url("/home");
                    }
                });

            return deferred.promise;
        }


    }

})();
