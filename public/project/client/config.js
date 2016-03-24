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
                controller:"LoginController",
                controllerAs: "model"

            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model"

            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs:"model"

            })

            .when("/search",{
                templateUrl:"views/search/search.view.html"
            })

            .when("/newNote",{
                templateUrl:"views/search/noteText.view.html"
            })

            .when("/groupList",{
                templateUrl:"views/group/group.view.html"
            })

            .when("/subject",{
                templateUrl:"views/subject/subject.view.html",
                controller: "SubjectController",
                controllerAs:"model"
            })

            .when("/notebook",{
                templateUrl: "views/subject/notebook.view.html",
                controller: "NotebookController",
                controllerAs: "model"
            })

            .when("/note",{
                templateUrl: "views/subject/note.view.html",
                controller: "NoteController",
                controllerAs: "model"
            })

            .when("/group",{
                templateUrl: "views/group/group.view.html",
                controller: "GroupController",
                controllerAs: "model"
            })

            .when("/noteText",{
                templateUrl: "views/search/noteText.view.html",
                controller: "NoteTextController",
                controllerAs: "model"
            })

            // only for CRUD

            .when("/users",{
                templateUrl: "views/crud/users.view.html",
                controller: "UserController"
            })








            .when("/subjects",{
                templateUrl: "views/crud/subjects.view.html",
                controller: "SubjectController"
            })



            .when("/notetext",{
                templateUrl: "views/crud/notesText.view.html",
                controller: "TextController"
            })





        //

           /* .otherwise({
                redirectTo:"/home"
            })*/
    }

})();

