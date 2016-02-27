(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){

        //initializing array of forms with JSON data

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234},
        ]

        var api={
            createFormForUser:createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById:deleteFormById,
            updateFormById:updateFormById
        }

        return api;

        function createFormForUser(userId, form, callback) {
            var newForm; //new form for the user

            form._id = (new Date).getTime();
            form.title = form.title;
            form.userId = userId;

            forms.push(form);
            callback(form);

        }

        function findAllFormsForUser(userId, callback) {
            var userForms = []; //array containing the forms of the particular user

            for (var i = 0; i < forms.length; i++) {
                if (forms[i].userId == userId) {
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback){

            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms.splice(i,1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){

            for (var i = 0; i < forms.length; i++) {
                if (forms[i]._id == formId) {
                    forms[i].title =newForm.title;
                    forms[i].userId = newForm.userId;
                    break;
                }
            }

            callback(forms[i]);

        }





    }
})();