module.exports = function(app, subjectModel){
    app.get("/api/project/subject/:subjectId/notebook/:notebookId/note", findAllNotesForBooks);
    app.get("/api/project/subject/:subjectId/notebook/:notebookId/note/:noteId", findNoteByIdForBook);
    app.delete("/api/project/subject/:subjectId/notebook/:notebookId/note/:noteId", deleteNoteFromBook);
    app.post("/api/project/subject/:subjectId/notebook/:notebookId/note", createNoteForBook);
    app.put("/api/project/subject/:subjectId/notebook/:notebookId/note/:noteId", updateNoteByIdForBook);
    app.get("/api/project/subject/:subjectId/notebook/:notebookId/note/:noteId/content", getContent);
    app.get("/api/project/user/:userId/title/:title", findNoteByTitle);






    function findAllNotesForBooks(req,res){

        var notebookId = req.params.notebookId;
        var subjectId = req.params.subjectId;
        subjectModel
            .findAllNotesForBooks(notebookId, subjectId)
            .then(
                function(response){

                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findNoteByIdForBook(req,res){

        var subjectId = req.params.subjectId;
        var notebookId = req.params.notebookId;
        var noteId = req.params.noteId;
        subjectModel
            .findNoteByIdForBook(subjectId, notebookId, noteId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );


    }

    function deleteNoteFromBook(req,res){

        var subjectId = req.params.subjectId;
        var notebookId = req.params.notebookId;
        var noteId = req.params.noteId;

        subjectModel
            .deleteNoteFromBook(subjectId,notebookId, noteId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createNoteForBook(req,res){

        var subjectId = req.params.subjectId;
        var notebookId = req.params.notebookId;
        var newNote = req.body;

        subjectModel
            .createNoteForBook(subjectId,notebookId,newNote)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateNoteByIdForBook(req,res){

        var subjectId = req.params.subjectId;
        var noteId = req.params.noteId;
        var notebookId = req.params.notebookId;
        var updatedNote = req.body;

        subjectModel
            .updateNoteByIdForBook(subjectId,notebookId,noteId,updatedNote)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function getContent (req,res){

        var subjectId = req.params.subjectId;
        var notebookId = req.params.notebookId;
        var noteId = req.params.noteId;


        subjectModel
            .getContent(subjectId,notebookId,noteId)
            .then(
                function(response){
                    res.json(response)
                },
                function (err){
                    res.status(400).send(err);
                }
            );


    }

    function findNoteByTitle(req,res){

        var userId = req.params.userId;
        var title = req.params.title;


        subjectModel
            .findNoteByTitle(userId, title)
            .then(
                function(response){
                    res.json(response)
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
};
