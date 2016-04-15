module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        email: String,
        password: String,
        type: String
    }, {collection: 'project_user'});
    return UserSchema;
};