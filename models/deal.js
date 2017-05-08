var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var dealSchema = Schema({
    Title: {type:String, required:true},
    SubTitle:{type:String},
    Content:{type:String, required:true},
    ExpireDate:Date,
    
    ReportIt:[{
        Email:String,
        Nickname:String,
    }],
    LikeIt:[{
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
    },
    MediaUrl:[{Url:{type:String,required:true},Caption:String,Link:String,Format:{type:String,required:true},Status:Number}]

});

dealSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Deal',dealSchema);




