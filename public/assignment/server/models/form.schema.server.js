module.exports = function(mongoose) {

    var FieldSchema = require('./field.schema.server.js')(mongoose);

    // use mongoose to declare a form schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        fields: [FieldSchema],
        created: {type: Date,
            default: new Date()},
        updated: {type: Date,
            default: new Date()}
    }, {collection: 'form'});
    return FormSchema;
};