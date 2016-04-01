module.exports = function(app, db, mongoose){
    var userModel = require("./models/user.model.js")(db, mongoose);
    var formModel = require("./models/form.model.js")();

    var userService = require("./services/user.service.server.js")(app,userModel);
    var formService = require("./services/form.service.server.js")(app,userModel,formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};