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
                templateUrl: "views/users/login.view.html",
                controller:"LoginController"

            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController"

            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController"

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

            .when("/noteList",{
                templateUrl:"views/search/noteList.view.html",
                controller: "NoteListController"
            })

            // only for CRUD

            .when("/users",{
                templateUrl: "views/crud/users.view.html",
                controller: "UserController"
            })

            .when("/notes",{
                templateUrl: "views/crud/notes.view.html",
                controller: "NoteController"
            })

            .when("/groups",{
                templateUrl: "views/crud/groups.view.html",
                controller: "GroupController"
            })


            .when("/notebooks",{
                templateUrl: "views/crud/notebooks.view.html",
                controller: "NotebookController"
            })

            .when("/subjects",{
                templateUrl: "views/crud/subjects.view.html",
                controller: "SubjectController"
            })




            //

           /* .otherwise({
                redirectTo:"/home"
            })*/
    }

})();

