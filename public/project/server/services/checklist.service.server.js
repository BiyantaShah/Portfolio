module.exports = function(app, userModel, checklistModel){
    app.delete("/api/project/checklist/:checklistId", deleteCheckListById);
    app.get("api/project/checklist/:title",findCheckListByTitle);
    app.get("/api/project/checklist/:checklistId",findCheckListById);
    app.post("/api/project/user/:userId/checklist", createCheckListForUser);
    app.get("/api/project/user/:userId/checklist", findAllCheckListsForUser);
    app.put("/api/project/checklist/:checklistId",updateCheckListById);
    app.get("/api/project/checklist/:checklistId/content", getContent);


    function deleteCheckListById(req,res){


        var checklistId = req.params.checklistId;

        checklistModel.deleteCheckListById(checklistId);
    }


    function findAllCheckListsForUser(req,res){
        var checklist = [];
        var userId = req.params.userId;

        checklistModel
            .findAllCheckListsForUser(userId)
            .then(
                function (response) {
                    checklist = response;
                    res.json(checklist);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findCheckListById(req,res){
        var list = null;
        var checklistId = req.params.checklistId;

        checklistModel
            .findCheckListById(checklistId)
            .then(
                function (response) {
                    list = response;
                    res.json(list);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findCheckListByTitle(req,res){

        var title = req.body;
         checklistModel.findCheckListByTitle(title)
             .then(function(response){
                 res.json(response)
             },
                 function(err){
                     res.status(400).send(err);
                 }
             );

    }


    function createCheckListForUser(req,res){
        var userId = req.params.userId;
        var newChecklist = req.body;

        checklistModel
            .createCheckListForUser(userId,newChecklist)
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

    function updateCheckListById(req,res){
        var checklistId = req.params.checklistId;
        var updatedList = req.body;

        res.json(checklistModel.updateCheckListById(checklistId,updatedList));

    }

    function getContent (req,res){


        var checklistId = req.params.checklistId;


        checklistModel
            .getContent(checklistId)
            .then(
                function(response){
                    res.json(response)
                },
                function (err){
                    res.status(400).send(err);
                }
            );


    }
};