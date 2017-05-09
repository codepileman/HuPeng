const request = require('request')
const expect = require('chai').expect

const ventService = require('../services/ventservice')

describe('The vent service module', function () {
  var insertedId= null;
  it('saves the vent', function() {
    var ventObj = {
      Title: "vent 1",
      Content: "This is vent 1",
      CreateDate: new Date((new Date()).toUTCString()),
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
      Status: 1,
      User: {
        Email: 'admin@hupengs.com',
        Nickname: 'admin',
      },
      Area: {
        Name: 'Sandys Spring',
        PostalCode: '30068',
      }
    };

    var savedObj = null;
    return ventService.saveVent(ventObj).then(function (obj) {
      savedObj = obj;
      insertedId = obj._id;
      expect(savedObj).to.not.null;
    });
  });
  
  it ('find all vents',function(){
    return ventService.fetchAllVents('30068','admin',1,10).then
    (function(vents){
      expect(vents.length).to.eql(1);
    });
  });


  it('delete by id',function(){

    return ventService.deleteVent(insertedId).then(function(){
       ventService.findById(insertedId).then(function(obj){
          expect(obj).to.be.null;
       })
    });
  });

  it('get the vent', function(){

    var ventObj = {
      Title: "vent 2",
      Content: "This is vent 2",
      CreateDate: new Date((new Date()).toUTCString()),
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
      Status: 1,
      User: {
        Email: 'admin@hupengs.com',
        Nickname: 'admin',
      },
      Area: {
        Name: 'Sandys Spring',
        PostalCode: '30068',
      }
    };
    ventService.saveVent(ventObj).then(function(obj){
      return ventService.findById(obj._id).then(function(savedObj){
        expect(savedObj).to.not.null;
        ventService.deleteVent(obj._id).then(function(){
          
        })
      });
    })
  });
})