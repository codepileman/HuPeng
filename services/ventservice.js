var Vent = require('../models/vent');
var User = require('../models/hpuser');

module.exports = {
    fetchAllVents: function(postal,user,pageNo,pageSize){
        var query = Vent.find({Area:{PostalCode:{$regex:postal}}},null,{skip:pageNo*pageSize});
        return query.exec();
    },
    findById : function(id){
        var query = Vent.findById(id);
        return query.exec();
    },
    updateVent :function (ventObj){
        var vent = new Vent(ventObj);
        var query = Vent.findByIdAndUpdate(ventObj._id,ventObj);
        return query.exec();
    },
    saveVent : function(ventObj){
        var vent = new Vent(ventObj);
        var query = Vent.save(null,null,true);
        return query.exec();
    }
}
