module.exports = function(app,formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldsById);
    app.delete("/api/assignment/form:formId/field/:fieldId", deleteFieldsById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);




    function findFormFields(req,res){
        var formId = req.formId;
        var fields = fieldModel.findFormFields(formId);
        res.json(fields);
    }

    function findFieldsById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = fieldModel.findFieldsById(formId,fieldId);
        res.json(field);
    }

    function deleteFieldsById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var delField = fieldModel.deleteFieldsById(formId,fieldId);
        res.json(delField);
    }

    function createField(req,res){
        var formId = req.params.formId;
        var field= req.body;
        var newField = fieldModel.createField(formId,field);
        req.session.currentField = newField;
        res.json(newField);
    }

    function updateFieldById(req,res){
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var form = req.body;
        var updated = fieldModel.updateFieldById(formId,fieldId,form)
        res.json(updated);
    }
};