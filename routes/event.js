var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var eventService = require('../services/eventservice');


router.post('/', function(req, res, next) {
    
        eventService.saveVent().then(function(event){
            res.json(event);
            }
        ).catch(function(err){
            res.json();
        });
});

router.delete('/:id',function(req,res,next){

});

router.delete('/',function(req,res,next){

});

router.put('/:id',function(req,res,next){

});

router.get('/',function(req,res,next){
    res.json();
});

router.get('/:id',function(req,res,next){
        eventService.findById(req.params.id)
        .then(function(event){
            res.json(event);
        })
        .catch(function(err){
            console.log(err);
    });
    

});

module.exports = router;
