var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var eventSchema = Schema({
    Title: {type:String, required:true},
    Content:{type:String, required:true},
    Address:{type:String, required:true},
    EventDate:Date,
    
    ReportIt:[{
        Email:String,
        Nickname:String,
    }],
    LikeIt:[{
        Email:{type:String,required:true},
        Nickname:String
    }],
    JoinIt:[{
        Email:{type:String,required:true},
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
    },
    MediaUrl:[{Url:{type:String,required:true},Caption:String,Link:String,Format:{type:String,required:true},Status:Number}]

});

eventSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Event',eventSchema);




