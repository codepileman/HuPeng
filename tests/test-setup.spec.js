const sinon = require('sinon')
const chai = require('chai')
const mongoose = require('mongoose')
const sinonChai = require('sinon-chai')

before(function () {
  console.log('!!!init test!!!')
  chai.use(sinonChai);
  mongoose.connect('localhost:27017/hupeng');
})

beforeEach(function () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
  this.sandbox.restore()
})

after(function(){
  mongoose.connection.close();
})