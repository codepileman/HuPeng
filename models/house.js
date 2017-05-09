var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var houseSchema = Schema({
    Title: {type:String, required:true},
    Description:{type:String,required:true},
    ListDate:Date,
    Price:String,
    Contact:String,
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
    },
    MediaUrl:[{Url:{type:String,required:true},Caption:String,Link:String,Format:{type:String,required:true},Status:Number}]

});

houseSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('House',houseSchema);




