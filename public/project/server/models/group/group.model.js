var q = require("q");


module.exports = function(app, GroupService, mongoose) {
    var groups = require("./group.mock.json");

    var GroupSchema = require("./group.schema.server.js")(mongoose);

    var GroupModel = mongoose.model('Project_Group', GroupSchema);

    var api = {
        //for group
        createGroupForUser: createGroupForUser,
        deleteGroupById: deleteGroupById,
        findGroupByTitle: findGroupByTitle,
        findAllGroupsForUser: findAllGroupsForUser,
        findGroupById: findGroupById,
        updateGroupById: updateGroupById

    };
    return api;


    // function implementation

    function createGroupForUser(userId, group){
        var deferred = q.defer();

        var newGroup = {
            "title": group.title,
            "members": group.members,
            "shared":[]
        };

        GroupModel.create(newGroup, function (err, doc){

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

    function deleteGroupById(groupId){
        var deferred = q.defer();

        GroupModel.remove({_id: groupId},
            function (err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }
            });


    }

    function findGroupByTitle(title){

        var deferred = q.defer();

        GroupModel.find({title: title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise
    }

    function findAllGroupsForUser(userId){

        var deferred = q.defer();

        GroupModel.find({userId: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }


    function findGroupById(groupId){

        var deferred = q.defer();

        GroupModel.findById(groupId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;



    }


    function updateGroupById(groupId, group) {

        var deferred = q.defer();

        GroupModel.update(
            { _id : groupId},
            { $set:  {
                "title": group.title
            }

            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });


        return deferred.promise

    }


};
