var q = require("q");


module.exports = function(app, CheckListService) {
    var checklists = require("./checklist.mock.json");
    var api = {
        //for checklist
        createCheckListForUser: createCheckListForUser,
        deleteCheckListById: deleteCheckListById,
        findCheckListByTitle: findCheckListByTitle,
        findAllCheckListsForUser: findAllCheckListsForUser,
        findCheckListById: findCheckListById,
        updateCheckListById: updateCheckListById,
        getContent : getContent


    };
    return api;

    //functions for checklists

    function createCheckListForUser(userId,checklist){
        var newChecklist = {
            "_id": (new Date()).getTime(),
            "title": checklist.title,
            "userId": userId,
            "content": null
        };

        checklists.push(newChecklist);

        var deferred = q.defer();
        deferred.resolve(checklists);

        return deferred.promise;

    }

    function deleteCheckListById(checklistId){
        for(var i in checklists) {
            if(checklists[i]._id == checklistId) {
                checklists.splice(i,1);
                break;
            }
        }

    }

    function findCheckListByTitle(title){

        var checklist = null;

        for (var i in checklists) {
            if(checklists[i].title == title) {
                checklist = checklists[i];
            }
        }

        var deferred = q.defer();
        deferred.resolve(checklist);
        return deferred.promise;
    }

    function findAllCheckListsForUser(userId){

        var userChecklist = [];
        for(var i in checklists){
            if (checklists[i].userId == userId){
                userChecklist.push(checklists[i]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(userChecklist);

        return deferred.promise;
    }


    function findCheckListById(checklistId){

        var checklist = null;

        for(var i in checklists){
            if(checklists[i]._id == checklistId) {

                checklist = checklists[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(checklist);

        return deferred.promise;



    }


    function updateCheckListById(checklistId, checklist) {

        for(var i in checklists) {
            if(checklists[i]._id == checklistId) {

                checklists[i] = checklist;
                break;
            }
        }

        return checklists[i];
    }

    function getContent(checklistId){

        var deferred = q.defer();
        var checklist  = null;

        for (var i in checklists){
            if(checklists[i]._id = checklistId){
                checklist = checklists[i];
                break;
            }
        }

        deferred.resolve(checklist);
        return deferred.promise
    }

};
