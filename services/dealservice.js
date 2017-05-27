/*deal service - Weiping Huang */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var async = require("async");
var Deal = require('../models/deal');
var User = require('../models/hpuser');


module.exports = {
    fetchAllDeals: function(postal,user,pageNo,pageSize){
        var promise = Deal.find({'Area.PostalCode':{$regex:postal}},null,{skip:(pageNo-1)*pageSize,limit:pageSize}).exec();
        return promise;
    },
    findById: function(id){
        var promise = Deal.findById(id).exec();
        return promise;
    },
    updateDeal: function (dealObj){
        this.findById(dealObj._id).then(
            function(deal){
               var newDeal = Object.assign(deal,dealObj);
               var query = Deal.findByIdAndUpdate(dealObj._id,dealObj);
               return query.exec();
            }
        ).catch(function(err){
            throw err;
        });
    },
    saveDeal: function(dealObj){
        var deal = new Deal(dealObj);
        var promise = deal.save();
        return promise;
    },
    reportDeal:function(dealId, user){
        return new Promise((resolve, reject) =>{
          this.findById(dealId)
            .then(function(deal){
              deal.ReportIt.push({Email: user.Email, Nickname: user.Nickname});
              deal.save().then(function(obj){
                 resolve(obj);
              }).catch(function(err){
                 reject(err);
              });
            })
            .catch(function(err){
                reject(err);
            });
        });
    },
    likeDeal:function(dealId, user){
        return new Promise((resolve, reject) =>{
           this.findById(dealId)
            .then(function(deal){
              deal.LikeIt.push({Email: user.Email, Nickname: user.Nickname});
              deal.save().then(function(obj){
                 resolve(obj);
              }).catch(function(err){
                 reject(err);
              });
            })
            .catch(function(err){
                reject(err);
            });
        });
    },
    deleteDeal: function(id){
       var promise = Deal.remove({_id:id}).exec();
       return promise;
    }

}
