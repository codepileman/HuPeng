
const https = require('https');
const Promise = require('bluebird');
const NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  // Optional depending on the providers 
  httpAdapter: 'https', // Default 
  apiKey: 'AIzaSyDZlFJNkr6LEZMMIVGJb7n0Xf-vBCCcEzQ', // for Mapquest, OpenCage, Google Premier 
  formatter: null,
  
};
 
var geocoder = NodeGeocoder(options);
 


module.exports = {

    findPostalCodeWithinRadius: function (zipcode, radius, unit) {

        let apiurl = 'https://www.zipcodeapi.com/rest/Sb0LDQmID7xsK1OJoUKhVhmo9Tzv5PSX1SIEJ5nmcVPXWDGlyrCuJZSSSsoYigVj/radius.json/' + zipcode + '/' + radius + '/' + unit;

        return new Promise((resolve,reject)=>{

        https.get(apiurl, (res) => {
            res.on('data', (d) => {
               resolve(d);
            });

        }).on('error', (e) => {
            reject(e);
        });


        });

    },

    findPostalcodeWithLatLong:function (latitude,longtitude){
        // Or using Promise 
      return geocoder.reverse({lat:latitude, lon:longtitude});
    }
}