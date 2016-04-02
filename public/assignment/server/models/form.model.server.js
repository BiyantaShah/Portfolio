var q = require("q");


module.exports = function(app,db, mongoose) {
    var mockForm = require("./form.mock.json");

    var FormSchema = require("./form.schema.server.js")(mongoose);



    // create user model from schema
    var FormModel = mongoose.model('Form', FormSchema);

    var fieldModel = require("./field.model.server.js")(FormModel);
    var fieldService = require("../services/field.service.server.js")(app,fieldModel);

    var api = {
        //for forms
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        updateFormById: updateFormById
    };
    return api;

    //functions for forms

    function createFormForUser(userId,form){
        var deferred = q.defer();

        var formObj = {
            "userId": userId,
            "title": form.title,
            "fields": [],
            "created": new Date(),
            "updated": new Date()
        };

        FormModel.create(formObj, function (err, doc) {
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

    function findAllFormsForUser(userId){

        var deferred = q.defer();

        FormModel.find({userId: userId},
            function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

    }


    function findFormById(formId){

        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function findFormByTitle(title){

        var deferred = q.defer();

        FormModel.find({title: title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteFormById(formId){
        var deferred = q.defer();

        FormModel.remove(
            { _id : formId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;


    }

    function updateFormById(formId, form) {

        var deferred = q.defer();



        FormModel.update(
            { _id : formId},
            { $set:  {
            "title": form.title,
            "fields": form.fields,
            "updated": new Date()}

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
