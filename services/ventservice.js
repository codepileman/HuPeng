var mongoose = require('mongoose');
const Promise = require('bluebird')
mongoose.Promise = Promise;
var async = require("async");
var Vent = require('../models/vent');
var User = require('../models/hpuser');

module.exports = {

    fetchVentsByPostalCode: function (postalCode, pageNo, pageSize) {
        var promise = Vent.find({ 'Area.PostalCode': { $regex: postal } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }).exec();
        return promise;

    },

    fetchAllVents: function (postalParam, radius, pageNo, pageSize) {

        //get postal service by radius
        //query postalcode api with postalParam and get postalcodes array;
        let postalCodes = ['30067'];
        let searchFuncArray = [];

        for (let a = 0; a < postalCodes.length; a++) {
            searchFuncArray[a] = function (callback) { Vent.find({ 'Area.PostalCode': { $regex: postalCodes[a] } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }, callback); };
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
        var promise = Vent.findById(id).exec();
        return promise;
    },

    updateVent: function (ventObj) {
        return new Promise((resolve, reject) => {

            this.findById(ventObj._id).then(
                function (vent) {
                    Object.assign(vent, ventObj);
                    var newObj = new Vent(vent);
                    newObj.save().then(function (svd) { resolve(svd); }).catch(function (err) {
                        reject(er);
                    });
                }
            ).catch(function (err) {
                reject(err);
            });
        });
    },

    saveVent: function (ventObj) {
        var vent = new Vent(ventObj);
        var promise = vent.save();
        return promise;
    },

    likeVent: function (ventId, user) {

        return new Promise((resolve, reject) => {

            this.findById(ventId).then(function (vent) {
                vent.LikeIt.push({ Email: user.Email, Nickname: user.Nickname });
                vent.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });

            }).catch(function (err) {
                reject(err);
            });

        });

    },

    reportVent: function (ventId, user) {
        return new Promise((resolve, reject) => {
            this.findById(ventId).then(function (vent) {
                vent.ReportIt.push({ Email: user.Email, Nickname: user.Nickname });
                vent.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });
            }).catch(function (err) {
                reject(err);
            });
        });

    },

    deleteVent: function (id) {
        var promise = Vent.remove({ _id: id }).exec();
        return promise;
    }

}
