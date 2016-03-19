module.exports = function(app,formModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByIdForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdForForm);




    function findAllFieldsForForm(req,res){
        var formId = req.params.formId;
        formModel
            .findAllFieldsForForm(formId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .findFieldByIdForForm(formId,fieldId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );


    }

    function deleteFieldFromForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .deleteFieldFromForm(formId,fieldId)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function createFieldForForm(req,res){

        var formId = req.params.formId;
        var newField = req.body;

        formModel
            .createFieldForForm(formId,newField)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function updateFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;

        formModel
            .updateFieldByIdForForm(formId,fieldId,updatedField)
            .then(
                function(doc){
                    res.json(doc)
                },

                function (err) {
                    res.status(400).send(err);
                }
            );

    }
};