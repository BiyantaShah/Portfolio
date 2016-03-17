(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $location) {
        var vm = this;

        function init() {


        }
        return init();
    }
})();