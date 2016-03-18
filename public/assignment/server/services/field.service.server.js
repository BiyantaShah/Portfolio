module.exports = function(app,formModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByIdForForm);
    app.delete("/api/assignment/form:formId/field/:fieldId", deleteFieldByIdForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdForForm);




    function findAllFieldsForForm(req,res){
        var formId = req.params.formId;

        res.json(formModel.findAllFieldsForForm(formId));
    }

    function findFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.findFieldByIdForForm(formId,fieldId));


    }

    function deleteFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.deleteFieldByIdForForm(formId,fieldId));

    }

    function createFieldForForm(req,res){
        var formId = req.params.formId;
        var newField = req.body;

        res.json(formModel.createFieldForForm(formId,newField));

    }

    function updateFieldByIdForForm(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedField = req.body;

        res.json(formModel.updateFieldByIdForForm(formId,fieldId,updatedField));

    }
};