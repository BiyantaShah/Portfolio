module.exports = function(app,db,mongoose) {

    var userModel = require("./models/user/user.model.js")(db, mongoose);
    var subjectModel = require("./models/subjects/subject.model.js")(app,db,mongoose);
    var notebookModel = require("./models/notebook/notebook.model.js")(app,db,mongoose);
    var noteModel = require("./models/note/note.model.js")(app,db,mongoose);
    var groupModel = require("./models/group/group.model.js")(app,db,mongoose);


    var userService = require("./services/user.service.server.js")(app,userModel);
    var subjectService = require("./services/subject.service.server.js")(app, subjectModel);
    var notebookService = require("./services/notebook.service.server.js")(app,notebookModel);
    var noteService = require("./services/note.service.server.js")(app,noteModel);
    var groupService = require("./services/group.service.server.js")(app,groupModel);
};
