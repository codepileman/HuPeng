
const https = require('https');
const Promise = require('bluebird')

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

    }
}