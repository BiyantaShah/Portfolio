(function(){
    'use strict';
    // dummy functionality
    // for displaying CRUD
    angular
        .module("NoteTakerWebsite")
        .factory("GroupCrudService", GroupCrudService);

    function GroupCrudService(){

        //initializing array of notes with JSON data

        var groups = [
            {"_id": "000", "name": "Phy Grp1", "users":["alice","bob"]},
            {"_id": "010", "name": "Chem Grp1", "users":["alice","bob","dan"]},
            {"_id": "020", "name": "Algo Grp1", "users":["charlie","dan"]},
            {"_id": "030", "name": "WebDev Grp1","users":["charlie","dan","alice"]}

        ]

        var api={
            createGroupForUser:createGroupForUser,
            findAllGroupForUser: findAllGroupForUser,
            deleteGroupById:deleteGroupById,
            updateGroupById:updateGroupById
        }

        return api;

        function createGroupForUser( group, callback) {
            groups.push(group);
            callback(group);

        }

        function findAllGroupForUser (callback) {
            callback(groups);
        }

        function deleteGroupById(groupId, callback){

            for (var i = 0; i < groups.length; i++) {
                if (groups[i]._id == groupId) {
                    groups.splice(i,1);
                    break;
                }
            }
            callback(groups);
        }

        function updateGroupById(groupId, newgroup, callback){

            for (var i = 0; i < groups.length; i++) {
                if (groups[i]._id == groupId) {
                    groups[i].name =newgroup.name;
                    groups[i].users = newgroup.users;

                   // for (var j=0;j < groups[i].users.length; j++ ) {
                  //   groups[i].users[j] = newgroup.users[j];
                  //}
                    break;
                }
            }

            callback(groups[i]);

        }





    }
})();