var mockForm = require("./form.mock.json");

module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        updateFormById: updateFormById

    };
    return api;

    function createFormForUser(form,userId){
        var form = {
            _id: (new Date()).getTime(),
            title: form.title,
            userId: userId,
            fields: form.fields
        }

        mockForm.push(form);
        return form;

    }

    function findAllFormsForUser(userId){

        var userForm = [];
        for(var f in mockForm){
            if (mockForm[f].userId === userId){
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
            if(mockForm[f].title === title) {
                flag = true;
                return mockForm[f];
                break;
            }
        }

        if(flag === false) {
            return null;
        }
    }

    function deleteFormById(formId){

        for(var f in mockForm) {
            if(mockForm[f]._id === formId) {
                delete mockForm[f];
            }
        }

    }

    function updateFormById(formId, form) {

        for(var f in mockForm) {
            if(mockForm[f]._id === formId) {

                mockForm[f] = form;
                return mockForm[f];

            }
        }
    }
}
