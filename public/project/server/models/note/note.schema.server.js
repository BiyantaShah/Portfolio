module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var NoteSchema = mongoose.Schema({
        title: String,
        content: String,
        notebookId : String,
        userId:String,
        type: String,
        reminder: Date
    }, {collection: 'project_note'});
    return NoteSchema;
};
