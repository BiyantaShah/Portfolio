(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){



        var api={
            createFormForUser:createFormForUser,
            findFormByTitle: findFormByTitle,
            findAllFormsForUser: findAllFormsForUser,
            findFormById: findFormById,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }

        return api;

        function createFormForUser(form, userId) {
            return $http.post ("/api/assignment/user/:userId/form", form, userId);

        }

        function findFormByTitle(title){
            return $http.get("api/assignment/form?title=title",title);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/:userId/form", userId);
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/:formId",formId);
        }


        function deleteFormById(formId){

            return $http.delete("/api/assignment/form/:formId", formId);
        }

        function updateFormById(formId, form){
            return $http.put("/api/assignment/form/:formId",formId, form)

        }





    }
})();