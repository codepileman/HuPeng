const request = require('request')
const expect = require('chai').expect

const zipcodeService = require('../services/zipcodeservice');

describe('The zipcode service module', function () {
  
  it('request nearby zipcode', function () {
  
    return zipcodeService.findPostalCodeWithinRadius('30067',5,'mile').then(function(zipcodejson){

        let zipcode = JSON.parse(zipcodejson);

        expect(zipcode).to.not.null;

    });

  });
  it('test google maps api',function(){
    return zipcodeService.findPostalcodeWithLatLong(33.757687, -84.394616).then(function(resultjson){
      expect(resultjson[0].zipcode).to.eql('30303');
    });

  });

})