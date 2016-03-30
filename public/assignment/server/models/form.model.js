var q = require("q");


module.exports = function(app) {
    var mockForm = require("./form.mock.json");
    var api = {
        //for forms
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        updateFormById: updateFormById,

        // for fields
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByIdForForm: findFieldByIdForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateFieldByIdForForm: updateFieldByIdForForm

    };
    return api;

    //functions for forms

    function createFormForUser(userId,form){
        var newForm = {
            "_id": (new Date()).getTime(),
            "title": form.title,
            "userId": userId,
            "fields": []
        };

        mockForm.push(newForm);

        var deferred = q.defer();
        deferred.resolve(mockForm);

        return deferred.promise;

    }

    function findAllFormsForUser(userId){

        var userForm = [];
        for(var f in mockForm){
            if (mockForm[f].userId == userId){
                userForm.push(mockForm[f]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(userForm);

        return deferred.promise;
    }


    function findFormById(formId){

        var form = null;

        for(var f in mockForm){
            if(mockForm[f]._id == formId) {

                form = mockForm[f];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(form);

        return deferred.promise;



    }

    function findFormByTitle(title){

        var form = null;

        for (var f in mockForm) {
            if(mockForm[f].title == title) {
                form = mockForm[i];
            }
        }

        var deferred = q.defer();
        deferred.resolve(form);
        return deferred.promise;
    }

    function deleteFormById(formId){
        for(var f in mockForm) {
            if(mockForm[f]._id == formId) {
                mockForm.splice(f,1);
                break;
            }
        }


    }

    function updateFormById(formId, form) {

        var deferred = q.defer();

        for(var f in mockForm) {
            if(mockForm[f]._id == formId) {

                mockForm[f] = form;
                break;

            }
        }

        deferred.resolve(mockForm[f]);
        return deferred.promise;

    }

    //functions for fields

    function findAllFieldsForForm(formId){
        var deferred = q.defer();
        var form=null;

        for(var i in mockForm){
            if(mockForm[i]._id==formId) {
                form = mockForm[i];
                break;
            }
        }
        deferred.resolve(form.fields);
        return deferred.promise;
    }

    function findFieldByIdForForm(formId,fieldId){
        var deferred = q.defer();
        var form = null;

        for(var i in mockForm){
            if(mockForm[i]._id==formId) {
                form = mockForm[i];
                break;
            }
        }

        var fieldSelect=null;
        for(var i in form.fields){
            if(form.fields[i]._id==fieldId){
                fieldSelect=form.fields[i];
            }
        }

        deferred.resolve(fieldSelect);
        return deferred.promise;
    }


    function deleteFieldFromForm(formId,fieldId){

        var deferred = q.defer();
        var form = null;

        for(var i in mockForm){
            if(mockForm[i]._id == formId) {
                form = mockForm[i];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                form.fields.splice(i,1);
            }
        }

        deferred.resolve(form);
        return deferred.promise;

    }

    function createFieldForForm(formId,field){

        var deferred = q.defer();
        var form = null;

        for(var i in mockForm){
            if(mockForm[i]._id == formId) {
                form = mockForm[i];
                break;
            }
        }

        field._id=(new Date).getTime();

        form.fields.push(field);

        deferred.resolve(form);
        return deferred.promise;

    }

    function updateFieldByIdForForm(formId,fieldId,field){

        var deferred = q.defer();
        var form = null;

        for(var i in mockForm){
            if(mockForm[i]._id == formId) {
                form = mockForm[i];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                form.fields[i] = field;
                break;
            }
        }

        deferred.resolve(form);
        return deferred.promise



    }
};
