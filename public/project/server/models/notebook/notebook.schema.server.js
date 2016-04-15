module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var NotebookSchema = mongoose.Schema({
        label: String,
        userId:String,
        subjectId:String
    }, {collection: 'project_notebook'});
    return NotebookSchema;
};
