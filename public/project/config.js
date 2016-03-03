(function(){

    angular
        .module("NoteTakerWebsite")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })

            .when("/login", {
                templateUrl: "views/users/login.view.html"

            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html"

            })

            .when("/register", {
                templateUrl: "views/users/register.view.html"

            })

            .when("/search",{
                templateUrl:"views/search/search.view.html"
            })

            .when("/newNote",{
                templateUrl:"views/search/newNote.view.html"
            })

            .when("/groupList",{
                templateUrl:"views/search/groupList.view.html"
            })

            .otherwise({
                redirectTo:"/home"
            })
    }

})();

