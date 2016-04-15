module.exports = function(app, groupModel){
    app.delete("/api/project/group/:groupId", deleteGroupById);
    app.get("api/project/group/:title",findGroupByTitle);
    app.get("/api/project/group/:groupId",findGroupById);
    app.post("/api/project/user/:userId/group", createGroupForUser);
    app.get("/api/project/user/:userId/group", findAllGroupsForUser);
    app.put("/api/project/group/:groupId",updateGroupById);
    app.put("/api/project/user/:username/group", updateMembers);
   app.put("/api/project/group", updateNotes);


    function deleteGroupById(req,res){

        var groupId = req.params.groupId;
        groupModel
            .deleteGroupById(groupId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findAllGroupsForUser(req,res){

        var userId = req.params.userId;

        groupModel
            .findAllGroupsForUser(userId)
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
        groupModel
            .findGroupByTitle(title)
            .then(
                function(response){
                    res.json(response)
                },
                function(err){
                    res.status(400).send(err);
                }
            );
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

        groupModel
            .updateGroupById(groupId,updatedGroup)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateMembers(req,res){
        var username = req.params.username;
        var group = req.body;

        groupModel
            .updateMembers(username,group )
            .then(
                function(response){
                    res.json(response)
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }


    function updateNotes(req,res){

        var group = req.body;

        groupModel
            .updateNotes(group)
            .then(
                function(response){
                    res.json(response)
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

};