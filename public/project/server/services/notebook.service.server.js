module.exports = function(app, notebookModel){
    app.get("/api/project/subject/:subjectId/notebook", findAllNotebooksForSubject);
    app.get("/api/project/notebook/:notebookId", findNotebookById);
    app.delete("/api/project/notebook/:notebookId", deleteNotebookFromSubject);
    app.post("/api/project/user/:userId/subject/:subjectId/notebook", createNotebookForSubject);
    app.post("/api/project/user/:userId/notebook", createNotebookForUser);
    app.put("/api/project/notebook/:notebookId", updateNotebookByIdForSubject);
    app.get("/api/project/user/:userId/notebook", findAllNotebooksForUser);



    function findAllNotebooksForUser(req,res){
        var userId = req.params.userId;

        notebookModel
            .findAllNotebooksForUser(userId)
            .then(
                function(response){

                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

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

        var userId = req.params.userId;
        var subjectId = req.params.subjectId;
        var newBook = req.body;

        notebookModel
            .createNotebookForSubject(subjectId,newBook, userId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createNotebookForUser(req,res){

        var userId = req.params.userId;
        var newBook = req.body;

        notebookModel
            .createNotebookForUser(userId,newBook)
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
