module.exports = function(app, userModel, formModel){
    app.delete("/api/assignment/form:formId", deleteFormById);
    app.get("api/assignment/form/:title",findFormByTitle);
    app.get("/api/assignment/form/:formId",findFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.put("/api/assignment/form/:formId",updateFormById);


    function deleteFormById(req,res){
        var formId = req.params.formId;
        var form = formModel.deleteFormById(formId);
        res.json(form);
    }


    function findAllFormsForUser(req,res){
        var userId = req.params.userId;
        res.json(formModel.findAllFormsForUser(userId));
    }

    function findFormById(req,res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }



    function findFormByTitle(req,res){
        var title = req.body;
        var form = formModel.findFormByTitle(title);
        res.json(form);
    }


    function createFormForUser(req,res){
        var userId = req.params.userId;
        var form = req.body;
        newForm = formModel.createFormForUser(userId,form);
        req.session.currentForm = newForm;
        res.json(newForm);

    }

    function updateFormById(req,res){
        var formId = req.params.formId;
        var form = req.body;
        var update = formModel.updateFormById(formId,form);
        res.json(update);
    }
};