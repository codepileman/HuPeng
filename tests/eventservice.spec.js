const request = require('request')
const expect = require('chai').expect

const eventService = require('../services/eventservice')

describe('The event service module', function () {
    var insertedId = null;
    it('saves the event', function () {
        var eventObj = {
            Title: "new years event",
            Content: "This is new year's evenet",
            Address: "event address :191 bulter rd, Duluth, GA",
            EventDate: new Date((new Date()).toUTCString()),

            LikeIt: [{
                Email: 'admin@hupengs.com',
                Nickname: 'admin'
            },
            {
                Email: 'user@hupengs.com',
                Nickname: 'user'
            },
            ],
            ReportIt: [],
            JoinIt: [{
                Email: 'userX@hupengs.com',
                Nickname: 'userx'
            },
            {
                Email: 'userY@hupengs.com',
                Nickname: 'usery'
            },
            {
                Email: 'userZ@hupengs.com',
                Nickname: 'userZ'
            },
            ],

            Status: 1,
            User: {
                Email: String,
                Nickname: String,
            },

            Area: {
                Name: "Duluth",
                PostalCode: "30068",
            },

            MediaUrl: [
                {
                    Url: "http://google.com/image/1.jpg",
                    Caption: "events jpg",
                    Link: "http://google.com/",
                    Format: "jpeg",
                    Status: 1
                },
                {
                    Url: "http://google.com/image/2.png",
                    Caption: "events png",
                    Link: "http://google.com/",
                    Format: "png",
                    Status: 1
                }



            ]

        };

        var savedObj = null;
        return eventService.saveEvent(eventObj).then(function (obj) {
            savedObj = obj;
            insertedId = obj._id;
            expect(savedObj).to.not.null;
        });
    });

    it('like a event', function () {
        return eventService.likeEvent(insertedId, { Email: 'test1@hupeng.com', Nickname: 'tester1' }).then(function (obj) {
            expect(obj.LikeIt[2].Email).to.eql('test1@hupeng.com');
            expect(obj.LikeIt[2].Nickname).to.eql('tester1');
        });

    });

    it('report a event', function () {
        return eventService.reportEvent(insertedId, { Email: 'test2@hupeng.com', Nickname: 'tester2' }).then(function (obj) {
            expect(obj.ReportIt[0].Email).to.eql('test2@hupeng.com');
            expect(obj.ReportIt[0].Nickname).to.eql('tester2');
        });
    });
   
   it('join a event', function () {
        return eventService.reportEvent(insertedId, { Email: 'test3@hupeng.com', Nickname: 'tester3' }).then(function (obj) {
            expect(obj.JoinIt[3].Email).to.eql('test3@hupeng.com');
            expect(obj.JoinIt[3].Nickname).to.eql('tester3');
        });
    });
   

    it('find all events', function () {
        return eventService.fetchAllEvents('30068', 'admin', 1, 10).then
            (function (events) {
                expect(events.length).to.eql(1);
            });
    });

    it('delete by id', function () {

        return eventService.deleteEvent(insertedId).then(function () {
            eventService.findById(insertedId).then(function (obj) {
                expect(obj).to.be.null;
            })
        });
    });

    it('get the event', function () {

        var eventObj = {
            Title: "new years event 2",
            Content: "This is new year's evenet 2",
            Address: "event address :191 bulter rd, Duluth, GA",
            EventDate: new Date((new Date()).toUTCString()),

            LikeIt: [{
                Email: 'admin@hupengs.com',
                Nickname: 'admin'
            },
            {
                Email: 'user@hupengs.com',
                Nickname: 'user'
            },
            ],
            ReportIt: [],
            JoinIt: [{
                Email: 'userX@hupengs.com',
                Nickname: 'usery'
            },
            {
                Email: 'userY@hupengs.com',
                Nickname: 'usery'
            },
            ],

            Status: 1,
            User: {
                Email: String,
                Nickname: String,
            },

            Area: {
                Name: "Duluth",
                PostalCode: "30068",
            },

            MediaUrl: [
                {
                    Url: "http://google.com/image/1.jpg",
                    Caption: "events jpg",
                    Link: "http://google.com/",
                    Format: "jpeg",
                    Status: 1
                },
                {
                    Url: "http://google.com/image/2.png",
                    Caption: "events png",
                    Link: "http://google.com/",
                    Format: "png",
                    Status: 1
                }



            ]

        };
        return eventService.saveEvent(eventObj).then(function (obj) {
            eventService.findById(obj._id).then(function (savedObj) {
                expect(savedObj).to.not.null;
                eventService.deleteEvent(savedObj._id);
            });
        })
    });
    it('update event by id', function () {

        var eventObj = {
            Title: "new years event 3",
            Content: "This is new year's evenet 3",
            Address: "event address :191 bulter rd, Duluth, GA",
            EventDate: new Date((new Date()).toUTCString()),

            LikeIt: [{
                Email: 'admin@hupengs.com',
                Nickname: 'admin'
            },
            {
                Email: 'user@hupengs.com',
                Nickname: 'user'
            },
            ],
            ReportIt: [],
            JoinIt: [{
                Email: 'userX@hupengs.com',
                Nickname: 'usery'
            },
            {
                Email: 'userY@hupengs.com',
                Nickname: 'usery'
            },
            ],

            Status: 1,
            User: {
                Email: String,
                Nickname: String,
            },

            Area: {
                Name: "Duluth",
                PostalCode: "30068",
            },

            MediaUrl: [
                {
                    Url: "http://google.com/image/1.jpg",
                    Caption: "events jpg",
                    Link: "http://google.com/",
                    Format: "jpeg",
                    Status: 1
                },
                {
                    Url: "http://google.com/image/2.png",
                    Caption: "events png",
                    Link: "http://google.com/",
                    Format: "png",
                    Status: 1
                }
            ]

        };
        eventService.saveEvent(eventObj).then(function (currentObj) {
            currentObj.Content = 'updated content';
            currentObj.Status = 2;

            eventService.updateEvent(currentObj).then(function () {
                eventService.findById(currentObj._id).then(function (obj) {

                    expect(obj.Status).to.eql(2);
                    expect(obj.Content).to.eql('updated content');
                    return eventService.deleteEvent(obj._id).catch(function (err) {
                        console.log('vent was not deleted');
                    });
                }).catch(function (err) {
                    throw err;
                })
            }).catch(function (err) {
                throw err;
            })
        });

    });



})