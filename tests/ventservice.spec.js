const fs = require('fs')
const request = require('request')
const expect = require('chai').expect

const ventService = require('../services/ventservice')

describe('The vent service module', function () {

  it('saves the vent', function* () {
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
      expect(savedObj).to.not.null;
    });
  });
})