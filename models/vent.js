var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var ventSchema = Schema({
    Title: {type:String, required:true },
    Content:{type:String, required:true },
    CreateDate:Date,
    LikeIt:[{
        Email:String,
        Nickname:String
    }],
    ReportIt:[{
        Email:String,
        Nickname:String,
    }],
    Status:Number,
    User:{
        Email:String,
        Nickname:String,
    },
    Area:{
        Name:String,
        PostalCode:String,
    }

});

ventSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Vent',ventSchema);


