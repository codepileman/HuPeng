const request = require('request')
const expect = require('chai').expect

const jobService = require('../services/jobservice')

describe('The job service module', function () {
  var insertedId = null;
  it('saves the job', function () {
    var jobObj = {
      Title: "senior operation manager ",
      Description: "This is job 1",
      PublishDate: new Date((new Date()).toUTCString()),
      JobType: "manager",
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

    var savedObj = null;
    return jobService.saveJob(jobObj).then(function (obj) {
      savedObj = obj;
      insertedId = obj._id;
      expect(savedObj).to.not.null;
    });
  });

  it('like a job', function () {
    return jobService.likeJob(insertedId, { Email: 'test1@hupeng.com', Nickname: 'tester1' }).then(function (obj) {
      expect(obj.LikeIt[1].Email).to.eql('test1@hupeng.com');
      expect(obj.LikeIt[1].Nickname).to.eql('tester1');
    });

  });

  it('report a job', function () {
    return jobService.reportJob(insertedId, { Email: 'test2@hupeng.com', Nickname: 'tester2' }).then(function (obj) {
      expect(obj.ReportIt[1].Email).to.eql('test2@hupeng.com');
      expect(obj.ReportIt[1].Nickname).to.eql('tester2');
    });
  });
/*
  it('find all jobs', function () {
    return jobService.fetchAllJobs('30068', 'admin', 1, 10).then
      (function (jobs) {
        expect(jobs.length).to.eql(1);
      });
  });*/


  it('delete by id', function () {

    return jobService.deleteJob(insertedId).then(function () {
      jobService.findById(insertedId).then(function (obj) {
        expect(obj).to.be.null;
      })
    });
  });

  it('get the job', function () {

    var jobObj = {
      Title: "senior hiring manager ",
      Description: "This is job 2",
      PublishDate: new Date((new Date()).toUTCString()),
      JobType: "manager",
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

    jobService.saveJob(jobObj).then(function (obj) {
      jobService.findById(obj._id).then(function (savedObj) {
        expect(savedObj).to.not.null;
        return jobService.deleteJob(savedObj._id).then(function(job){
        });
      });
    })
  });
})
