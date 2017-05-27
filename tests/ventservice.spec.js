const request = require('request')
const expect = require('chai').expect

const ventService = require('../services/ventservice')

describe('The vent service module', function () {
  var insertedId = null;
  it('saves the vent', function () {
    var ventObj = {
      Title: "vent 1",
      Content: "This is vent 1",
      CreateDate: new Date((new Date()).toUTCString()),
      LikeIt: [{
        Email: 'admin@hupengs.com',
        Nickname: 'admin'
      }
      ],
      ReportIt: [
        {
          Email: 'user@hupengs.com',
          Nickname: 'user'
        }
      ],
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

  it('like a vent', function () {
    return ventService.likeVent(insertedId, { Email: 'test1@hupeng.com', Nickname: 'tester1' }).then(function (obj) {
      expect(obj.LikeIt[1].Email).to.eql('test1@hupeng.com');
      expect(obj.LikeIt[1].Nickname).to.eql('tester1');
    });

  });

  it('report a vent', function () {
    return ventService.reportVent(insertedId, { Email: 'test2@hupeng.com', Nickname: 'tester2' }).then(function (obj) {
      expect(obj.ReportIt[1].Email).to.eql('test2@hupeng.com');
      expect(obj.ReportIt[1].Nickname).to.eql('tester2');
    });
  });


  it('find all vents', function () {
    return ventService.fetchAllVents('30068', 'admin', 1, 10).then
      (function (vents) {
        expect(vents.length).to.eql(1);
      });
  });

  it('delete by id', function () {

    return ventService.deleteVent(insertedId).then(function () {
      ventService.findById(insertedId).then(function (obj) {
        expect(obj).to.be.null;
      })
    });
  });
   
  it('get the vent', function () {

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
   return  ventService.saveVent(ventObj).then(function (obj) {
      ventService.findById(obj._id).then(function (savedObj) {
        expect(savedObj).to.not.null; 
        ventService.deleteVent(savedObj._id);
      });
    })
  });
  it('update vent by id',function(){
    
     var ventObj = {
      Title: "vent 3",
      Content: "This is vent 3",
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
    ventService.saveVent(ventObj).then(function (currentObj) {
    currentObj.Content = 'updated content';
    currentObj.Status =2;

    ventService.updateVent(currentObj).then(function(){
        ventService.findById(currentObj._id).then(function(obj){

          expect(obj.Status).to.eql(2);
          expect(obj.Content).to.eql('updated content');
          return ventService.deleteVent(obj._id).catch(function(err){
              console.log('vent was not deleted');
          });
        }).catch(function(err){
          throw err;
        })
    }).catch(function(err){
      throw err;
    })
    });

});
  


})