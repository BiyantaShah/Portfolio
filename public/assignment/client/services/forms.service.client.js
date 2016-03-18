(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http){



        var model={
            createFormForUser:createFormForUser,
            findFormByTitle: findFormByTitle,
            findAllFormsForUser: findAllFormsForUser,
            findFormById: findFormById,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }

        return model;

        function createFormForUser(form, userId) {
            return $http.post ("/api/assignment/user/" + userId+ "/form" +form);

        }

        function findFormByTitle(title){
            return $http.get("api/assignment/form/"+ title);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/"+ userId +"/form");
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/:formId",formId);
        }


        function deleteFormById(formId){

            return $http.delete("/api/assignment/form/"+ formId);
        }

        function updateFormById(formId, form){
            return $http.put("/api/assignment/form/"+ formId, form)

        }





    }
})();