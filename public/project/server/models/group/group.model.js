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
        updateGroupById: updateGroupById,
        updateMembers: updateMembers,
        updateNotes: updateNotes

    };
    return api;


    // function implementation

    function createGroupForUser(userId, group){
        var deferred = q.defer();

        var newGroup = {
            "title": group.title,
            "members": group.members,
            "shared":[],
            "createdBy": userId
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
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise

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

        GroupModel.find({createdBy: userId},
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

    function updateMembers(username, group){

        var deferred = q.defer();

        GroupModel.update(
            {_id : group._id},
            {$set: {
                "members": group.members
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

    function updateNotes(group){

        var deferred = q.defer();

        GroupModel.update(
            {_id : group._id},
            {$set: {
                "shared": group.shared
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
