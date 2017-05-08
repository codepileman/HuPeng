var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var hpUserSchema = new Schema({
    Email:{type:String, required:true,unique:true},
    Nickname:{type:String,required:true},
    Password:{type:String,required:true},
    Status:Number,
    LastLoginDate:Date,
    HP:Number,
    EXP:Number,
    Level:Number,
    Role:[{Type:{type:Number,required:true,unique:true},Name:String,Permission:Number}],
    settings:{radius:{type:Number},notification:Boolean,Picture:{Url:{type:String}}}
});

hpUserSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('HPUser', hpUserSchema);