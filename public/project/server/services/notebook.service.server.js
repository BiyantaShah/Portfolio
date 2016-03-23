module.exports = function(app, subjectModel){
    app.get("/api/project/subject/:subjectId/notebook", findAllNotebooksForSubject);
    app.get("/api/project/subject/:subjectId/notebook/:notebookId", findNotebookByIdForSubject);
    app.delete("/api/project/subject/:subjectId/notebook/:notebookId", deleteNotebookFromSubject);
    app.post("/api/project/subject/:subjectId/notebook", createNotebookForSubject);
    app.put("/api/project/subject/:subjectId/notebook/:notebookId", updateNotebookByIdForSubject);




    function findAllNotebooksForSubject(req,res){
        var subjectId = req.params.subjectId;
        subjectModel
            .findAllNotebooksForSubject(subjectId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findNotebookByIdForSubject(req,res){
        var subjectId = req.params.subjectId;
        var notebookId = req.params.notebookId;
        subjectModel
            .findNotebookByIdForSubject(subjectId,notebookId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );


    }

    function deleteNotebookFromSubject(req,res){
        var subjectId = req.params.subjectId;
        var notebookId = req.params.notebookId;
        subjectModel
            .deleteNotebookFromSubject(subjectId,notebookId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createNotebookForSubject(req,res){

        var subjectId = req.params.subjectId;
        var newBook = req.body;

        subjectModel
            .createNotebookForSubject(subjectId,newBook)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateNotebookByIdForSubject(req,res){
        var subjectId = req.params.subjectId;
        var notebookId = req.params.notebookId;
        var updatedBook = req.body;

        subjectModel
            .updateNotebookByIdForSubject(subjectId,notebookId,updatedBook)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }
};
