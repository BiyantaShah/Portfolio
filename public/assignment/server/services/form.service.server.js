module.exports = function(app,model){
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("api/assignment/form?title=title",findFormByTitle);
    app.get("/api/assignment/form/:formId",findFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.put("/api/assignment/form/:formId",updateFormById);


    function deleteFormById(req,res){
        var formId = req.params.formId;
        var form = model.deleteFormById(formId);
        res.json(form);
    }


    function findAllFormsForUser(req,res){
        var userId = req.params.userId;
        res.json(model.findAllFormsForUser(userId));
    }

    function findFormById(req,res){
        var formId = req.params.formId;
        var form = model.findFormById(formId);
        res.json(form);
    }



    function findFormByTitle(req,res){
        var title = req.body;
        var form = model.findFormByTitle(title);
        res.json(form);
    }


    function createFormForUser(req,res){
        var userId = req.params.userId;
        var form = req.body;
        form = model.createFormForUser(userId,form);
        req.session.currentForm = form;
        res.json(form);

    }

    function updateFormById(req,res){
        var formId = req.params.formId;
        var form = req.body;
        var update = model.updateFormById(formId,form);
        res.json(update);
    }
}