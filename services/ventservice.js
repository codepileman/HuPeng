var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Vent = require('../models/vent');
var User = require('../models/hpuser');


module.exports = {
    fetchAllVents: function(postal,user,pageNo,pageSize){
        var promise = Vent.find({'Area.PostalCode':{$regex:postal}},null,{skip:(pageNo-1)*pageSize,limit:pageSize}).exec();
        //var promise = Vent.find({}).exec();

        return promise;
    },
    findById : function(id){
        var promise = Vent.findById(id).exec();
        return promise;
    },
    updateVent :function (ventObj){
        this.findById(ventObj._id).then(
            function(vent){
               var newVent = Object.assign(vent,VentObj);
               var query = Vent.findByIdAndUpdate(ventObj._id,ventObj);
               return query.exec();
            }
        ).catch(function(err){
            throw err;
        });
    },
    saveVent : function(ventObj){
        var vent = new Vent(ventObj);
        var promise = vent.save();
        return promise;
    },
    likeVent:function(ventId){

    },
    reportVent:function(ventId){

    },
    deleteVent: function(id){
        
       var promise = Vent.remove({_id:id}).exec();
       return promise;
    }

}
