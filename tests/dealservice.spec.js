const request = require('request')
const expect = require('chai').expect

const dealService = require('../services/dealservice')

describe('The deal service module', function () {
  var insertedId = null;
  it('saves the deal', function () {
    var dealObj = {
      Title: "4K LCD HD TV",
      SubTitle: "one day sale event from best buy",
      Content: "4K LCD HD TV one-day sale",
      ExpireDate: new Date((new Date()).toUTCString()),
      ReportIt: [
        {
          Email: 'user@hupengs.com',
          Nickname: 'user'
        }
      ],
      LikeIt: [{
          Email: 'admin@hupengs.com',
          Nickname: 'admin'
        }
      ],
      Status: 1,
      User: {
        Email: 'admin@hupengs.com',
        Nickname: 'admin',
      },
      Area: {
        Name: 'Dunwoody',
        PostalCode: '30350',
      }
    };

    var savedObj = null;
    return dealService.saveDeal(dealObj).then(function (obj) {
      savedObj = obj;
      insertedId = obj._id;
      expect(savedObj).to.not.null;
    });
  });

  it('like a deal', function () {
    return dealService.likeDeal(insertedId, { Email: 'test1@hupeng.com', Nickname: 'tester1' }).then(function (obj) {
      expect(obj.LikeIt[1].Email).to.eql('test1@hupeng.com');
      expect(obj.LikeIt[1].Nickname).to.eql('tester1');
    });

  });

  it('report a deal', function () {
    return dealService.reportDeal(insertedId, { Email: 'test2@hupeng.com', Nickname: 'tester2' }).then(function (obj) {
      expect(obj.ReportIt[1].Email).to.eql('test2@hupeng.com');
      expect(obj.ReportIt[1].Nickname).to.eql('tester2');
    });
  });
/*
  it('find all deals', function () {
    return dealService.fetchAlldeals('30068', 'admin', 1, 10).then
      (function (deals) {
        expect(deals.length).to.eql(1);
      });
  });*/


  it('delete by id', function () {

    return dealService.deleteDeal(insertedId).then(function () {
      dealService.findById(insertedId).then(function (obj) {
        expect(obj).to.be.null;
      })
    });
  });

  it('get the deal', function () {

    var dealObj = {
      Title: "Desinger dressing shoes sale",
      SubTitle: "one day sale event from Macy's",
      Content: "Buy one get second one 40 %off",
      ExpireDate: new Date((new Date()).toUTCString()),
      ReportIt: [
        {
          Email: 'user@hupengs.com',
          Nickname: 'user'
        }
      ],
      LikeIt: [{
          Email: 'admin@hupengs.com',
          Nickname: 'admin'
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

    dealService.saveDeal(dealObj).then(function (obj) {
      dealService.findById(obj._id).then(function (savedObj) {
        expect(savedObj).to.not.null;
        return dealService.deleteDeal(savedObj._id).then(function(deal){
        });
      });
    })
  });
})
