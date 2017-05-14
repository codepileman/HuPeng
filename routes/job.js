/*job models - Weiping Huang */
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var jobService = require('../services/jobservice');

router.get('/',function(req,res,next){
  //Get all events information
    res.json();
});

router.get('/:id',function(req,res,next){
//Get a specific job post informaiton based on Id
        jobService.findById(req.params.id)
        .then(function(vent){
            res.json(vent);
        })
        .catch(function(err){
            console.log(err);
    });


});

router.post('/', function(req, res, next) {
 //Add new a job post
  jobService.saveJob().then(function(job){
    res.json(job);
  }
  ).error(function(err){
    res.json();
  });
});

router.delete('/:id',function(req,res,next){
  jobService.deleteJob(req.params.id)
    .error(function(err){
      console.log(err);
  })
});


router.put('/:id',function(req,res,next){
//Edit an existing job post


});


module.exports = router;
