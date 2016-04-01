var q = require("q");

module.exports = function(FormModel){



    var api = {

        // for fields
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldByIdForForm: findFieldByIdForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateFieldByIdForForm: updateFieldByIdForForm

    };
    return api;

    function findAllFieldsForForm(formId){
        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, response) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(response.fields);
            }
        });

        return deferred.promise;
    }

    function findFieldByIdForForm(formId,fieldId){

        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, response) {
            if (err) {
                deferred.reject(err);
            } else {

                var fields = response.fields;
                for(var i in fields){
                    if(fields[i]._id == fieldId){
                        deferred.resolve(fields[i]);
                    }
                }
            }
        });

        return deferred.promise;

    }


    function deleteFieldFromForm(formId,fieldId){

        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, response) {
            if (err) {
                deferred.reject(err);
            } else {
                var form = response;
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields.splice(i,1);
                        FormModel.update(
                            { _id : formId},
                            { $set: form
                            }, function (err, response) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(response);
                                }
                            });
                    }
                }
            }
        });

        return deferred.promise;

    }

    function createFieldForForm(formId,field){

        var deferred = q.defer();

        FormModel.findById(formId,
            function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var form = doc;
                form.fields.push(field);
                FormModel.update(
                    { _id : formId},
                    { $set: form
                    }, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });

            }
        });

        return deferred.promise;

    }

    function updateFieldByIdForForm(formId,fieldId,field){

        var deferred = q.defer();
        FormModel.findById(formId,
            function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var form = doc;
                for(var i in form.fields){
                    if(form.fields[i]._id == fieldId){
                        form.fields[i] = field;
                        FormModel.update(
                            { _id : formId},
                            { $set: form
                            }, function (err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(doc);
                                }
                            });
                    }
                }
            }
        });

        return deferred.promise;


    }
};