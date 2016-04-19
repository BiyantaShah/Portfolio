module.exports = function(app, noteModel){
    app.get("/api/project/notebook/:notebookId/note", findAllNotesForBooks);
    app.get("/api/project/note/:noteId", findNoteById);
    app.get("/api/project/title/:title", findByTitle);
    app.delete("/api/project/note/:noteId", deleteNoteFromBook);
    app.post("/api/project/user/:userId/notebook/:notebookId/note", createNoteForBook);
    app.post("/api/project/user/:userId/note", createNoteForUser);
    app.put("/api/project/note/:noteId", updateNoteByIdForBook);
    app.put("/api/project/note/:noteId/content/:newField", addItem);
    app.put("/api/project/note/:noteId/content", delItem);
    app.get("/api/project/user/:userId/title/:title", findNoteByTitle);
    app.get("/api/project/user/:userId/note", findAllNotesForUsers);
    app.get("/api/project/search/:title", searchNote);



    function delItem(req,res){

        var noteId = req.params.noteId;

        noteModel
            .delItem(noteId)
            .then(
                function(response){
                    res.json(response);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }


    function addItem(req,res){
        var noteId = req.params.noteId;

        var newField = req.params.newField;

        noteModel
            .addItem(noteId, newField)
            .then(
                function(response){
                    res.json(response);
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function findAllNotesForBooks(req,res){

        var notebookId = req.params.notebookId;

        noteModel
            .findAllNotesForBooks(notebookId)
            .then(
                function(response){

                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findNoteById(req,res){


        var noteId = req.params.noteId;
        noteModel
            .findNoteById(noteId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );


    }

    function findByTitle(req,res){

        var title = req.params.title;

        noteModel.findByTitle(title)
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


        var noteId = req.params.noteId;

        noteModel
            .deleteNoteFromBook(noteId)
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

        var userId = req.params.userId;
        var notebookId = req.params.notebookId;
        var newNote = req.body;

        noteModel
            .createNoteForBook(notebookId,newNote, userId)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createNoteForUser(req,res){

        var userId = req.params.userId;
        var newNote = req.body;

        noteModel
            .createNoteForUser(userId, newNote)
            .then(
                (function(response){
                    res.json(response)
                }),
                function(err){
                    res.status(400).send(err);
                }
            )

    }

    function updateNoteByIdForBook(req,res){


        var noteId = req.params.noteId;
        var updatedNote = req.body;

        noteModel
            .updateNoteByIdForBook(noteId,updatedNote)
            .then(
                function(response){
                    res.json(response)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

   /* function getContent (req,res){


        var noteId = req.params.noteId;


        noteModel
            .getContent(noteId)
            .then(
                function(response){
                    res.json(response)
                },
                function (err){
                    res.status(400).send(err);
                }
            );


    }*/

    function findNoteByTitle(req,res){

        var userId = req.params.userId;
        var title = req.params.title;


        noteModel
            .findNoteByTitle(userId,title)
            .then(
                function(response){
                    res.json(response)
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllNotesForUsers(req,res){

        var userId = req.params.userId;

        noteModel
            .findAllNotesForUsers(userId)
            .then(
                function(response){
                    res.json(response)
                },
                function(err){
                    res.status(400).send(err);
                }
            )


    }

    function searchNote(req,res){
        var title = req.params.title;

        var user = req.user;
        var userId = user._id;

                noteModel
                    .searchNote(title, userId)
                    .then(
                           function(response)
                           {
                               res.json(response);
                           },
                            function(err){
                                res.status(400).send(err);
                            }
                    );
    }
};
