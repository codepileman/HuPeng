var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');


var jobSchema = Schema({
    Title: {type:String, required:true},
    Description:{type:String,required:true},
    PublishDate:Date,
    JobType:String,
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
});

jobSchema.plugin(mongooseUniqueValidator);


module.exports = mongoose.model('Job',jobSchema);




