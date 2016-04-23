(function(){

    angular
        .module("NoteTakerWebsite")
        .config(Configure);

    function Configure($routeProvider){
        $routeProvider

            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })

            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedInAdmin: checkLoggedInAdmin
                }
            })


            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller:"LoginController",
                controllerAs: "model"

            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }

            })

            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller:"RegisterController",
                controllerAs:"model"

            })


            .when("/subject",{
                templateUrl:"views/subject/subject.view.html",
                controller: "SubjectController",
                controllerAs:"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/subject/:subjectId/notebook",{
                templateUrl: "views/subject/notebook.view.html",
                controller: "NotebookController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/subject/:subjectId/notebook/:notebookId/note",{
                templateUrl: "views/subject/note.view.html",
                controller: "NoteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/group",{
                templateUrl: "views/group/group.view.html",
                controller: "GroupController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/note/:noteId/noteText",{
                templateUrl: "views/search/noteText.view.html",
                controller: "NoteTextController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/note/:noteId/checklist",{
                templateUrl: "views/search/checklist.view.html",
                controller: "CheckListController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/search",{
                templateUrl:"views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })

            .when("/group/:groupId/details",{
                templateUrl:"views/group/groupDetails.view.html",
                controller:"DetailsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })


            .otherwise({
                redirectTo:"/home"
            })
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var projectUser = response.data;
                UserService.setCurrentUser(projectUser);
                deferred.resolve();
            });

        return deferred.promise;
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;

                console.log("in config");
                console.log(response.data);
                if((currentUser != null && currentUser != "" )|| ($location.url() == '/home')) {

                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/home');

                }
            });

        return deferred.promise;
    }

    function checkLoggedInAdmin(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(((currentUser != null) && (currentUser.type == "admin"))
                    || ($location.url() == '/home')) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/home');
                }
            });

        return deferred.promise;
    }

})();

