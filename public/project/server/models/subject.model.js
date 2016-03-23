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
        updateSubjectById: updateSubjectById,

        // for notebook
        findAllNotebooksForSubject: findAllNotebooksForSubject,
        findNotebookByIdForSubject: findNotebookByIdForSubject,
        deleteNotebookFromSubject: deleteNotebookFromSubject,
        createNotebookForSubject: createNotebookForSubject,
        updateNotebookByIdForSubject: updateNotebookByIdForSubject

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

    //functions for notebook

    function findAllNotebooksForSubject(subjectId){
        var deferred = q.defer();
        var subject =null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }
        deferred.resolve(subject.notebooks);
        return deferred.promise;
    }

    function findNotebookByIdForSubject(subjectId,notebookId){
        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        var bookSelect=null;
        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId){
                bookSelect=subject.notebooks[i];
            }
        }

        deferred.resolve(bookSelect);
        return deferred.promise;
    }


    function deleteNotebookFromSubject(subjectId,notebookId){

        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId){
                subject.notebooks.splice(i,1);
            }
        }

        deferred.resolve(subject);
        return deferred.promise;

    }

    function createNotebookForSubject(subjectId,newBook){

        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        newBook._id=(new Date).getTime();

        subject.notebooks.push(newBook);

        deferred.resolve(subject);
        return deferred.promise;

    }

    function updateNotebookByIdForSubject(subjectId,notebookId,book){

        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId){
                subject.notebooks[i] = book;
                break;
            }
        }

        deferred.resolve(subject);
        return deferred.promise



    }
};
