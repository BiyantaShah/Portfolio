(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http,$rootScope){



        var model={
            createFormForUser:createFormForUser,
            getFormId:getFormId,
            setFormId:setFormId,
            findFormByTitle: findFormByTitle,
            findAllFormsForUser: findAllFormsForUser,
            findFormById: findFormById,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }

        return model;

        //function implementation

        function getFormId(){
            return $rootScope.formId;
        }

        function  setFormId(formId){
            $rootScope.formId = formId;
        }



        function createFormForUser(userId,form) {
            return $http.post ("/api/assignment/user/" + userId+ "/form" ,form);

        }

        function findFormByTitle(title){
            return $http.get("api/assignment/form/"+ title);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/"+ userId +"/form");
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/"+formId);
        }


        function deleteFormById(formId){

            return $http.delete("/api/assignment/form/"+formId);
        }

        function updateFormById(formId, form){
            return $http.put("/api/assignment/form/"+ formId, form)

        }





    }
})();