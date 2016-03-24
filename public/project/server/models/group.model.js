var q = require("q");


module.exports = function(app) {
    var groups = require("./group.mock.json");
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

    function createGroupForUser(userId,group){
        var newGroup = {
            "_id": (new Date()).getTime(),
            "title": group.title,
            "users": [userId],
            "members":group.members
        };

        groups.push(newGroup);

        var deferred = q.defer();
        deferred.resolve(groups);

        return deferred.promise;

    }

    function deleteGroupById(groupId){
        for(var i in groups) {
            if(groups[i]._id == groupId) {
                groups.splice(i,1);
                break;
            }
        }


    }

    function findGroupByTitle(title){

        var group = null;

        for (var i in groups) {
            if(groups[i].title == title) {
                group = groups[i];
            }
        }

        var deferred = q.defer();
        deferred.resolve(group);
        return deferred.promise;
    }

    function findAllGroupsForUser(userId){

        var userGroup = [];
        for(var i in groups){
            for(var j in groups ){
                if (groups[i].users[j] == userId){
                    userGroup.push(groups[i]);
                }
            }

        }

        var deferred = q.defer();
        deferred.resolve(userGroup);

        return deferred.promise;
    }


    function findGroupById(groupId){

        var group = null;

        for(var i in groups){
            if(groups[i]._id === groupId) {

                group = groups[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(group);

        return deferred.promise;



    }


    function updateGroupById(groupId, group) {

        for(var i in groups) {
            if(groups[i]._id == groupId) {

                groups[i].title = group.title;
                groups[i].userId = group.userId;
                groups[i].members = group.members;
                break;

            }
        }
        return groups[i];

    }


};
