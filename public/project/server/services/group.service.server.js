module.exports = function(app, groupModel){
    app.delete("/api/project/group/:groupId", deleteGroupById);
    app.get("api/project/group/:title",findGroupByTitle);
    app.get("/api/project/group/:groupId",findGroupById);
    app.post("/api/project/user/:userId/group", createGroupForUser);
    app.get("/api/project/user/:userId/group", findAllGroupsForUser);
    app.put("/api/project/group/:groupId",updateGroupById);


    function deleteGroupById(req,res){

        var groupId = req.params.groupId;

        groupModel.deleteGroupById(groupId);
    }


    function findAllGroupsForUser(req,res){
        var group = [];
        var userId = req.params.userId;

        groupModel
            .findAllGroupsForUser(userId)
            .then(
                function (response) {
                    group = response;
                    res.json(group);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findGroupById(req,res){
        var group = null;
        var groupId = req.params.groupId;

        groupModel
            .findGroupById(groupId)
            .then(
                function (response) {
                    group = response;
                    res.json(group);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findGroupByTitle(req,res){
        var title = req.body;
        var group = groupModel.findGroupByTitle(title);
        res.json(group);
    }


    function createGroupForUser(req,res){
        var userId = req.params.userId;
        var newGroup = req.body;


        groupModel
            .createGroupForUser(userId,newGroup)
            .then(
                function (response) {
                    res.json(response);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateGroupById(req,res){
        var groupId = req.params.groupId;
        var updatedGroup = req.body;

        res.json(groupModel.updateGroupById(groupId,updatedGroup));
    }
};