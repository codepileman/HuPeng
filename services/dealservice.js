var mongoose = require('mongoose');
const Promise = require('bluebird')
mongoose.Promise = Promise;
var async = require("async");
var Deal = require('../models/deal');
var User = require('../models/hpuser');

module.exports = {

    fetchDealsByPostalCode: function (postalCode, pageNo, pageSize) {
        var promise = Deal.find({ 'Area.PostalCode': { $regex: postal } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }).exec();
        return promise;

    },

    fetchAllDeals: function (postalParam, radius, pageNo, pageSize) {

        //get postal service by radius
        //query postalcode api with postalParam and get postalcodes array;
        let postalCodes = ['30067'];
        let searchFuncArray = [];

        for (let a = 0; a < postalCodes.length; a++) {
            searchFuncArray[a] = function (callback) { Deal.find({ 'Area.PostalCode': { $regex: postalCodes[a] } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }, callback); };
        }

        return new Promise((resolve, reject) => {
            async.parallel(searchFuncArray,
                // optional callback
                function (err, results) {
                    //need merge result and have unique result;
                    resolve(results);
                });
        }
        );

    },

    findById: function (id) {
        var promise = Deal.findById(id).exec();
        return promise;
    },

    updateDeal: function (dealObj) {
        return new Promise((resolve, reject) => {

            this.findById(dealObj._id).then(
                function (deal) {
                    Object.assign(deal, dealObj);
                    var newObj = new Deal(deal);
                    newObj.save().then(function (svd) { resolve(svd); }).catch(function (err) {
                        reject(er);
                    });
                }
            ).catch(function (err) {
                reject(err);
            });
        });
    },

    saveDeal: function (dealObj) {
        var deal = new Deal(dealObj);
        var promise = deal.save();
        return promise;
    },

    likeDeal: function (dealId, user) {

        return new Promise((resolve, reject) => {

            this.findById(dealId).then(function (deal) {
                deal.LikeIt.push({ Email: user.Email, Nickname: user.Nickname });
                deal.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });

            }).catch(function (err) {
                reject(err);
            });

        });

    },

    reportDeal: function (dealId, user) {
        return new Promise((resolve, reject) => {
            this.findById(dealId).then(function (deal) {
                deal.ReportIt.push({ Email: user.Email, Nickname: user.Nickname });
                deal.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });
            }).catch(function (err) {
                reject(err);
            });
        });

    },

    deleteDeal: function (id) {
        var promise = Deal.remove({ _id: id }).exec();
        return promise;
    },

    addMedia:function(media) {

    },
    removeMedia:function(media){

    }

}
