var mockForm = require("./form.mock.json");

module.exports = function(app) {
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
        updateFieldForForm: updateFieldForForm

    };
    return api;

    //functions for forms

    function createFormForUser(userId,form){
        var newForm = {
            "_id": (new Date()).getTime(),
            "title": form.title,
            "userId": userId
        };

        mockForm.push(newForm);
        return mockForm;

    }

    function findAllFormsForUser(userId){

        var userForm = [];
        for(var f in mockForm){
            if (mockForm[f].userId == userId){
                userForm.push(mockForm[f]);
            }
        }

        return userForm;

    }


    function findFormById(formId){
        var flag = false;

        for(var f in mockForm){
            if(mockForm[f]._id === formId) {
                flag = true;
                return mockForm[f];
                break;
            }
        }

        if(flag === false) {
            return null;
        }


    }

    function findFormByTitle(title){

        var flag = false;

        for (var f in mockForm) {
            if(mockForm[f].title == title) {
                flag = true;
                return mockForm[f];
                break;
            }
        }

        if(flag == false) {
            return null;
        }
    }

    function deleteFormById(formId){
        for(var f in mockForm) {
            if(mockForm[f]._id == formId) {
                mockForm.splice(f,1);
                console.log(mockForm.length);
                break;
            }
        }
        return mockForm;

    }

    function updateFormById(formId, form) {

        for(var f in mockForm) {
            if(mockForm[f]._id === formId) {

                mockForm[f].title = form.title;
                mockForm[f].userId = form.userId;
                break;

            }
        }
        return mockForm[f];
    }

    //functions for fields

    function findAllFieldsForForm(formId){

        var form=null;

        for(var u in mockForm){
            if(mockForm[u]._id==formId) {
                form = mockForm[u];
                break;
            }
        }

        return form.fields;
    }

    function findFieldByIdForForm(formId,fieldId){

        var form=null;

        for(var u in mockForm){
            if(mockForm[u]._id == formId) {
                form = mockForm[u];
                break;
            }
        }

        var fieldSelect=null;
        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                fieldSelect=form.fields[i];
            }
        }

        return fieldSelect;

    }

    function deleteFieldFromForm(formId,fieldId){

        var form=null;

        for(var u in mockForm){
            if(mockForm[u]._id==formId) {
                form = mockForm[u];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id == fieldId){
                form.fields.splice(i,1);
            }
        }
        return form;

    }

    function createFieldForForm(formId,field){

        var form=null;

        for(var u in mockForm){
            if(mockForm[u]._id==formId) {
                form = mockForm[u];
                break;
            }
        }

        field._id=(new Date).getTime();
        form.fields.push(field);
        return form;

    }

    function updateFieldForForm(formId,fieldId,field){

        var form=null;


        for(var u in mock){
            if(mockForm[u]._id==formId) {
                form = mockForm[u];
                break;
            }
        }

        for(var i in form.fields){
            if(form.fields[i]._id==fieldId){
                form.fields[i]= field;
                break;
            }
        }

        return form;



    }
};
