var mockForm = require("./form.mock.json");

module.exports = function(app) {
    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        updateFormById: updateFormById

    };
    return api;

    function createFormForUser(userId,form){
        var newForm = {
            "_id": (new Date()).getTime(),
            "title": form.title,
            "userId": userId
        };

        mockForm.push(newForm);
        return newForm;

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
};
