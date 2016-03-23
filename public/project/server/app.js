module.exports = function(app) {

    var userModel = require("./models/user.model.js")();
    var subjectModel = require("./models/subject.model.js")();

    var userService = require("./services/user.service.server.js")(app,userModel);
    var subjectService = require("./services/subject.service.server.js")(app,userModel, subjectModel);
};
