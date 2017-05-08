var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    nickname: {type:String, required:true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    settings:{radius:{type:Number},notification:Boolean}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);