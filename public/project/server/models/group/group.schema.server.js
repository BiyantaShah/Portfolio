module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var GroupSchema = mongoose.Schema({
        title: String,
        members: [String],
        shared : [String],
        createdBy: String
    }, {collection: 'project_group'});
    return GroupSchema;
};
