var q = require("q");


module.exports = function(app, SubjectService) {
    var subjects = require("./subject.mock.json");
    var api = {
        //for subject
        createSubjectForUser: createSubjectForUser,
        deleteSubjectById: deleteSubjectById,
        findSubjectByTitle: findSubjectByTitle,
        findAllSubjectsForUser: findAllSubjectsForUser,
        findSubjectById: findSubjectById,
        updateSubjectById: updateSubjectById,

        // for notebook
        findAllNotebooksForSubject: findAllNotebooksForSubject,
        findNotebookByIdForSubject: findNotebookByIdForSubject,
        deleteNotebookFromSubject: deleteNotebookFromSubject,
        createNotebookForSubject: createNotebookForSubject,
        updateNotebookByIdForSubject: updateNotebookByIdForSubject,

        //for notes
        findAllNotesForBooks: findAllNotesForBooks,
        findNoteByIdForBook:findNoteByIdForBook,
        deleteNoteFromBook:deleteNoteFromBook,
        createNoteForBook: createNoteForBook,
        updateNoteByIdForBook:updateNoteByIdForBook,
        getContent: getContent,
        findNoteByTitle:findNoteByTitle

    };
    return api;

    //functions for forms

    function createSubjectForUser(userId,subject){
        var newSubject = {
            "_id": (new Date()).getTime(),
            "title": subject.title,
            "userId": userId,
            "notebooks": subject.notebooks
        };

        subjects.push(newSubject);

        var deferred = q.defer();
        deferred.resolve(subjects);

        return deferred.promise;

    }

    function deleteSubjectById(subjectId){
        for(var i in subjects) {
            if(subjects[i]._id == subjectId) {
                subjects.splice(i,1);
                break;
            }
        }


    }

    function findSubjectByTitle(title){

        var subject = null;

        for (var i in subjects) {
            if(subjects[i].title == title) {
                subject = subjects[i];
            }
        }

        var deferred = q.defer();
        deferred.resolve(subject);
        return deferred.promise;
    }

    function findAllSubjectsForUser(userId){

        var userSubject = [];
        for(var i in subjects){
            if (subjects[i].userId == userId){
                userSubject.push(subjects[i]);
            }
        }

        var deferred = q.defer();
        deferred.resolve(userSubject);

        return deferred.promise;
    }


    function findSubjectById(subjectId){

        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id === subjectId) {

                subject = subjects[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(subject);

        return deferred.promise;



    }





    function updateSubjectById(subjectId, subject) {

        for(var i in subjects) {
            if(subjects[i]._id == subjectId) {

                subjects[i].title = subject.title;
                subjects[i].userId = subject.userId;
                break;

            }
        }
        return subjects[i];

    }

    //functions for notebook

    function findAllNotebooksForSubject(subjectId){

        var deferred = q.defer();
        var subject =null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        deferred.resolve(subject.notebooks);
        return deferred.promise;
    }

    function findNotebookByIdForSubject(subjectId,notebookId){
        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        var bookSelect=null;
        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId){
                bookSelect=subject.notebooks[i];
            }
        }

        deferred.resolve(bookSelect);
        return deferred.promise;
    }


    function deleteNotebookFromSubject(subjectId,notebookId){

        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId){
                subject.notebooks.splice(i,1);
            }
        }

        deferred.resolve(subject);
        return deferred.promise;

    }

    function createNotebookForSubject(subjectId,newBook){

        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        newBook._id=(new Date).getTime();

        subject.notebooks.push(newBook);

        deferred.resolve(subject);
        return deferred.promise;

    }

    function updateNotebookByIdForSubject(subjectId,notebookId,book){

        var deferred = q.defer();
        var subject = null;

        for(var i in subjects){
            if(subjects[i]._id == subjectId) {
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId){
                subject.notebooks[i] = book;
                break;
            }
        }

        deferred.resolve(subject);
        return deferred.promise



    }

    // note functions

    function findAllNotesForBooks(notebookId, subjectId){

        var deferred = q.defer();
        var subject = null
        var notebook = null;

        for (var i in subjects){
            if(subjects[i]._id == subjectId){
                subject = subjects[i];
                break;
            }
        }


        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId) {
                notebook = subject.notebooks[i];
                break;
            }
        }

        deferred.resolve(notebook.notes);
        return deferred.promise;
    }

    function findNoteByIdForBook(subjectId,notebookId,noteId){
        var deferred = q.defer();
        var subject = null;
        var notebook = null;

        for (var i in subjects){
            if(subjects[i]._id == subjectId){
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId) {
                notebook = subject.notebooks[i];
                break;
            }
        }

        var noteSelect=null;
        for(var i in notebook.notes){
            if(notebook.notes[i]._id == noteId){
                noteSelect = notebook.notes[i];
            }
        }

        deferred.resolve(noteSelect);
        return deferred.promise;
    }

    function deleteNoteFromBook(subjectId,notebookId,noteId){

        var deferred = q.defer();
        var subject = null;
        var notebook = null;

        for (var i in subjects){
            if(subjects[i]._id == subjectId){
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId) {
                notebook = subject.notebooks[i];
                break;
            }
        }

        for(var i in notebook.notes){
            if(notebook.notes[i]._id == noteId){
                notebook.notes.splice(i,1);
            }
        }

        deferred.resolve(notebook);
        return deferred.promise;

    }

    function createNoteForBook(subjectId,notebookId,newNote){

        var deferred = q.defer();
        var subject = null;
        var notebook = null;

        for (var i in subjects){
            if(subjects[i]._id == subjectId){
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId) {
                notebook = subject.notebooks[i];
                break;
            }
        }

        newNote._id=(new Date).getTime();

        notebook.notes.push(newNote);

        deferred.resolve(notebook);
        return deferred.promise;

    }

    function updateNoteByIdForBook(subjectId,notebookId,noteId, note){

        var deferred = q.defer();
        var subject = null;
        var notebook = null;

        for (var i in subjects){
            if(subjects[i]._id == subjectId){
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId) {
                notebook = subject.notebooks[i];
                break;
            }
        }

        for(var i in notebook.notes){
            if(notebook.notes[i]._id == noteId){
                notebook.notes[i] = note;
                break;
            }
        }

        deferred.resolve(notebook);
        return deferred.promise
    }

    function getContent(subjectId, notebookId,noteId ){

        var deferred = q.defer();
        var subject = null;
        var notebook = null;
        var note = null;

        for (var i in subjects){
            if(subjects[i]._id == subjectId){
                subject = subjects[i];
                break;
            }
        }

        for(var i in subject.notebooks){
            if(subject.notebooks[i]._id == notebookId) {
                notebook = subject.notebooks[i];
                break;
            }
        }

        for(var i in notebook.notes){
            if(notebook.notes[i]._id == noteId){
                 note = notebook.notes[i];
                break;
            }
        }


        deferred.resolve(note);
        return deferred.promise
    }

    function findNoteByTitle(userId, title){
        var deferred = q.defer();

        var finalNote = null;
        var subject = [];
        var Id1,Id2;

        for(var a in subjects){
            if(subjects[a].userId == userId){
                subject.push(subjects[a]);
            }
        }


        for(var i in subject) {

            var notebooks = subject[i].notebooks;
           // console.log(notebooks);

            for (var j in notebooks) {
                var notes = notebooks[j].notes;

                for (var k in notes) {
                    var name = notes[k].noteTitle;

                    if (name == title) {
                        Id1=subject[i]._id;
                        Id2=notebooks[j]._id;
                        finalNote = notes[k];

                    }

                }
            }

         }

        var abcd = {"note" :finalNote, "subjectId": Id1, "notebookId": Id2 };
        deferred.resolve(abcd);
        return deferred.promise
    }
};
