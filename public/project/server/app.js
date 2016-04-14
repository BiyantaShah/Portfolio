module.exports = function(app) {

    var userModel = require("./models/user.model.js")();
    var subjectModel = require("./models/subject.model.js")();
    var groupModel = require("./models/group.model.js")();
    var checklistModel = require("./models/checklist.model.js")();


    var userService = require("./services/user.service.server.js")(app,userModel);
    var subjectService = require("./services/subject.service.server.js")(app,userModel, subjectModel);
    var notebookService = require("./services/notebook.service.server.js")(app,subjectModel);
    var noteService = require("./services/note.service.server.js")(app,subjectModel);
    var groupService = require("./services/group.service.server.js")(app,groupModel);
    var checkService = require("./services/checklist.service.server.js")(app, userModel, checklistModel);
};
