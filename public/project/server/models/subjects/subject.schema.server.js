module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var SubjectSchema = mongoose.Schema({
        title: String,
        userId:String
    }, {collection: 'project_subject'});
    return SubjectSchema;
};
