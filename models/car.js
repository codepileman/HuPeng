var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var carSchema = Schema({
    Title: {type:String, required:true},
    Description:{type:String, required:true},
    ListDate:Date,
    Price:Number,
    Make:{type:String,required:true},
    Model:{type:String, required:true},
    Year:{type:String, required:true},
    Contact:{type:String, required:true},
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

carSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Car',carSchema);




