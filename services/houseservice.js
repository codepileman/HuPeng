var mongoose = require('mongoose');
const Promise = require('bluebird')
mongoose.Promise = Promise;
var async = require("async");
var House = require('../models/house');
var User = require('../models/hpuser');

module.exports = {

    fetchHouseByPostalCode: function (postalCode, pageNo, pageSize) {
        var promise = House.find({ 'Area.PostalCode': { $regex: postal } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }).exec();
        return promise;

    },

    fetchAllHouses: function (postalParam, radius, pageNo, pageSize) {

        //get postal service by radius
        //query postalcode api with postalParam and get postalcodes array;
        let postalCodes = ['30067'];
        let searchFuncArray = [];

        for (let a = 0; a < postalCodes.length; a++) {
            searchFuncArray[a] = function (callback) { House.find({ 'Area.PostalCode': { $regex: postalCodes[a] } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }, callback); };
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
        var promise = House.findById(id).exec();
        return promise;
    },

    updateHouse: function (houseObj) {
        return new Promise((resolve, reject) => {

            this.findById(houseObj._id).then(
                function (house) {
                    Object.assign(house, houseObj);
                    var newObj = new House(house);
                    newObj.save().then(function (svd) { resolve(svd); }).catch(function (err) {
                        reject(er);
                    });
                }
            ).catch(function (err) {
                reject(err);
            });
        });
    },

    saveHouse: function (houseObj) {
        var house = new House(houseObj);
        var promise = house.save();
        return promise;
    },


    reportHouse: function (houseId, user) {
        return new Promise((resolve, reject) => {
            this.findById(houseId).then(function (house) {
                house.ReportIt.push({ Email: user.Email, Nickname: user.Nickname });
                house.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });
            }).catch(function (err) {
                reject(err);
            });
        });

    },

    deleteHouse: function (id) {
        var promise = House.remove({ _id: id }).exec();
        return promise;
    },

    addMedia:function(media) {

    },
    removeMedia:function(media){

    }

}
