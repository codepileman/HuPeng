var mongoose = require('mongoose');
const Promise = require('bluebird')
mongoose.Promise = Promise;
var async = require("async");
var Event = require('../models/event');
var User = require('../models/hpuser');

module.exports = {

    fetchEventsByPostalCode: function (postalCode, pageNo, pageSize) {
        var promise = Event.find({ 'Area.PostalCode': { $regex: postal } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }).exec();
        return promise;

    },

    fetchAllEvents: function (postalParam, radius, pageNo, pageSize) {

        //get postal service by radius
        //query postalcode api with postalParam and get postalcodes array;
        let postalCodes = ['30067'];
        let searchFuncArray = [];

        for (let a = 0; a < postalCodes.length; a++) {
            searchFuncArray[a] = function (callback) { Event.find({ 'Area.PostalCode': { $regex: postalCodes[a] } }, null, { skip: (pageNo - 1) * pageSize, limit: pageSize }, callback); };
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
        var promise = Event.findById(id).exec();
        return promise;
    },

    updateEvent: function (eventObj) {
        return new Promise((resolve, reject) => {

            this.findById(eventObj._id).then(
                function (event) {
                    Object.assign(event, eventObj);
                    var newObj = new Event(event);
                    newObj.save().then(function (svd) { resolve(svd); }).catch(function (err) {
                        reject(er);
                    });
                }
            ).catch(function (err) {
                reject(err);
            });
        });
    },

    saveEvent: function (eventObj) {
        var event = new Event(eventObj);
        var promise = event.save();
        return promise;
    },

    likeEvent: function (eventId, user) {

        return new Promise((resolve, reject) => {

            this.findById(eventId).then(function (event) {
                event.LikeIt.push({ Email: user.Email, Nickname: user.Nickname });
                event.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });

            }).catch(function (err) {
                reject(err);
            });

        });

    },

    joinEvent: function (eventId, user) {

        return new Promise((resolve, reject) => {

            this.findById(eventId).then(function (event) {
                event.JoinIt.push({ Email: user.Email, Nickname: user.Nickname });
                event.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });

            }).catch(function (err) {
                reject(err);
            });

        });

    },

    reportEvent: function (eventId, user) {
        return new Promise((resolve, reject) => {
            this.findById(eventId).then(function (event) {
                event.ReportIt.push({ Email: user.Email, Nickname: user.Nickname });
                event.save().then(function (obj) {
                    resolve(obj);
                }).catch(function (er) {
                    reject(er);
                });
            }).catch(function (err) {
                reject(err);
            });
        });

    },

    deleteEvent: function (id) {
        var promise = Event.remove({ _id: id }).exec();
        return promise;
    },

    addMedia:function(media) {

    },
    removeMedia:function(media){
        
    }

}
