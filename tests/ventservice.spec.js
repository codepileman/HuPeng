const fs = require('fs')
const request = require('request')

const expect = require('chai').expect

const ventService = require('../services/ventservice')

describe('The vent service module', function () {
  it('saves the vent', function * () {
    const url = 'google.com'
    const content = '<h1>title</h1>'
    
    /*
    const writeFileStub = this.sandbox.stub(fs, 'writeFile', function (filePath, fileContent, cb) {
      cb(null)
    })

    const requestStub = this.sandbox.stub(request, 'get', function (url, cb) {
      cb(null, null, content)
    })

    const result = yield webpage.saveWebpage(url)

    expect(writeFileStub).to.be.calledWith()
    expect(requestStub).to.be.calledWith(url)
    expect(result).to.eql('page')
    */
  });
  it('get vent by id',function * (){

      expect(1).to.eql(1);
  })
})