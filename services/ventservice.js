var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Vent = require('../models/vent');
var User = require('../models/hpuser');


module.exports = {
    fetchAllVents: function(postal,user,pageNo,pageSize){
        var query = Vent.find({Area:{PostalCode:{$regex:postal}}},null,{skip:pageNo*pageSize});
        return query;
    },
    findById : function(id){
        var query = Vent.findById(id);
        return query;
    },
    updateVent :function (ventObj){
        this.findById(ventObj._id).then(
            function(vent){
               var newVent = Object.assign(vent,VentObj);
               var query = Vent.findByIdAndUpdate(ventObj._id,ventObj);
               return query.exec();
            }
        ).error(function(err){
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

    }

}
