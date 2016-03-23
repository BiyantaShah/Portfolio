var q = require("q");


module.exports = function(app) {
    var subjects = require("./subject.mock.json");
    var api = {
        //for subject
        createSubjectForUser: createSubjectForUser,
        deleteSubjectById: deleteSubjectById,
        findSubjectByTitle: findSubjectByTitle,
        findAllSubjectsForUser: findAllSubjectsForUser,
        findSubjectById: findSubjectById,
        updateSubjectById: updateSubjectById

        // for fields
      /*  findAllFieldsForForm: findAllFieldsForForm,
        findFieldByIdForForm: findFieldByIdForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateFieldByIdForForm: updateFieldByIdForForm*/

    };
    return api;

    //functions for forms

    function createSubjectForUser(userId,subject){
        var newSubject = {
            "_id": (new Date()).getTime(),
            "title": subject.title,
            "userId": userId
        };

        subjects.push(newSubject);

        var deferred = q.defer();
        deferred.resolve(subjects);

        return deferred.promise;

    }

    function deleteSubjectById(subjectId){
        for(var i in subjects) {
            if(subjects[i]._id == subjectId) {
                subjects.splice(i,1);
                break;
            }
        }


    }

    function findSubjectByTitle(title){

        var subject = null;

        for (var i in subjects) {
            if(subjects[i].title == title) {
                subject = subjects[i];
            }
        }

        var deferred = q.defer();
        deferred.resolve(subject);
        return deferred.promise;
    }

    function findAllSubjectsForUser(userId){

        var userSubject = [];
        for(var i in subjects){
            if (subjects[i].userId == userId){
                userSubject.push(subjects[i]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(userSubject);

        return deferred.promise;
    }


    function findSubjectById(subjectId){

        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id === subjectId) {

                subject = subjects[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(subject);

        return deferred.promise;



    }





    function updateSubjectById(subjectId, subject) {

        for(var i in subjects) {
            if(subjects[i]._id == subjectId) {

                subjects[i].title = subject.title;
                subjects[i].userId = subject.userId;
                break;

            }
        }
        return subjects[i];

    }

    //functions for fields
/*
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

        for(var i in forms){
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



    }*/
};
