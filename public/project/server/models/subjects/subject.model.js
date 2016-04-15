var q = require("q");


module.exports = function(app, SubjectService, mongoose) {
    var subjects = require("./subject.mock.json");

    var SubjectSchema = require("./subject.schema.server.js")(mongoose);

    var SubjectModel = mongoose.model('Project_Subject', SubjectSchema);
    var api = {
        //for subject
        createSubjectForUser: createSubjectForUser,
        deleteSubjectById: deleteSubjectById,
        findSubjectByTitle: findSubjectByTitle,
        findAllSubjectsForUser: findAllSubjectsForUser,
        findSubjectById: findSubjectById,
        updateSubjectById: updateSubjectById


    };
    return api;

    //functions for forms

    function createSubjectForUser(userId,subject){

        var deferred = q.defer();
        var newSubject = {
            "title": subject.title,
            "userId": userId

        };

        SubjectModel.create(newSubject, function (err, doc){

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });
        return deferred.promise;


    }

    function deleteSubjectById(subjectId){
        var deferred = q.defer();

        SubjectModel.remove(
            { _id : subjectId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;


    }

    function findSubjectByTitle(title){

        var deferred = q.defer();

        SubjectModel.find({title: title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllSubjectsForUser(userId){

        var deferred = q.defer();

        SubjectModel.find({userId: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }


    function findSubjectById(subjectId){

        var deferred = q.defer();

        SubjectModel.findById(subjectId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;



    }





    function updateSubjectById(subjectId, subject) {

        var deferred = q.defer();

        SubjectModel.update(
            { _id : subjectId},
            { $set:  {
                "title": subject.title
            }

            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;

    }


};
