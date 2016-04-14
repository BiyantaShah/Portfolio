module.exports = function(app, userModel, subjectModel){
    app.delete("/api/project/subject/:subjectId", deleteSubjectById);
    app.get("api/project/subject/:title",findSubjectByTitle);
    app.get("/api/project/subject/:subjectId",findSubjectById);
    app.post("/api/project/user/:userId/subject", createSubjectForUser);
    app.get("/api/project/user/:userId/subject", findAllSubjectsForUser);
    app.put("/api/project/subject/:subjectId",updateSubjectById);


    function deleteSubjectById(req,res){

        var subjectId = req.params.subjectId;

        subjectModel.deleteSubjectById(subjectId);
    }


    function findAllSubjectsForUser(req,res){
        var subject = [];
        var userId = req.params.userId;

        subjectModel
            .findAllSubjectsForUser(userId)
            .then(
                function (response) {
                    subject = response;
                    res.json(subject);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findSubjectById(req,res){
        var subject = null;
        var subjectId = req.params.subjectId;

        subjectModel
            .findSubjectById(subjectId)
            .then(
                function (response) {
                    subject = response;
                    res.json(subject);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findSubjectByTitle(req,res){
        var title = req.body;
         subjectModel.findSubjectByTitle(title)
             .then(function(response){
                 res.json(response);
             },
                 function(err){
                     res.status(400).send(err);
                 }
             );

    }


    function createSubjectForUser(req,res){
        var userId = req.params.userId;
        var newSubject = req.body;

        subjectModel
            .createSubjectForUser(userId,newSubject)
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

    function updateSubjectById(req,res){
        var subjectId = req.params.subjectId;
        var updatedSub = req.body;

        res.json(subjectModel.updateSubjectById(subjectId,updatedSub));
    }
};