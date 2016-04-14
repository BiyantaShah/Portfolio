module.exports = function(app, notebookModel){
    app.get("/api/project/subject/:subjectId/notebook", findAllNotebooksForSubject);
    app.get("/api/project/notebook/:notebookId", findNotebookById);
    app.delete("/api/project/notebook/:notebookId", deleteNotebookFromSubject);
    app.post("/api/project/subject/:subjectId/notebook", createNotebookForSubject);
    app.put("/api/project/notebook/:notebookId", updateNotebookByIdForSubject);




    function findAllNotebooksForSubject(req,res){

        var subjectId = req.params.subjectId;

        notebookModel
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

    function findNotebookById(req,res){

        var notebookId = req.params.notebookId;

        notebookModel
            .findNotebookById(notebookId)
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

        var notebookId = req.params.notebookId;
        notebookModel
            .deleteNotebookFromSubject(notebookId)
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

        notebookModel
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

        var notebookId = req.params.notebookId;
        var updatedBook = req.body;

        notebookModel
            .updateNotebookByIdForSubject(notebookId,updatedBook)
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
