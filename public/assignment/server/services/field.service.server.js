module.exports = function(app,formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldsByIdForForm);
    app.delete("/api/assignment/form:formId/field/:fieldId", deleteFieldsByIdForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdForForm);




    function findAllFieldsForForm(req,res){

    }

    function findFieldsByIdForForm(req,res){

    }

    function deleteFieldsByIdForForm(req,res){

    }

    function createFieldForForm(req,res){

    }

    function updateFieldByIdForForm(req,res){

    }
};