module.exports = function(app, userModel, formModel){
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.get("api/assignment/form/:title",findFormByTitle);
    app.get("/api/assignment/form/:formId",findFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.put("/api/assignment/form/:formId",updateFormById);


    function deleteFormById(req,res){

        var formId = req.params.formId;

        formModel.deleteFormById(formId);
    }


    function findAllFormsForUser(req,res){
        var forms = [];
        var userId = req.params.userId;

        formModel
            .findAllFormsForUser(userId)
            .then(
                function (doc) {
                    forms = doc;
                    res.json(forms);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req,res){
        var form = null;
        var formId = req.params.formId;

        formModel
            .findFormById(formId)
            .then(
                function (doc) {
                    form = doc;
                    res.json(form);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }



    function findFormByTitle(req,res){
        var title = req.body;
        var form = formModel.findFormByTitle(title);
        res.json(form);
    }


    function createFormForUser(req,res){
        var userId = req.params.userId;
        var newForm = req.body;

        formModel
            .createFormForUser(userId,newForm)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateFormById(req,res){
        var formId = req.params.formId;
        var updatedForm = req.body;

        res.json(formModel.updateFormById(formId,updatedForm));
    }
};