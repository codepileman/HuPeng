var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var ventService = require('../services/ventservice');


router.post('/', function(req, res, next) {
    
        ventService.saveVent().then(function(vent){
            res.json(vent);
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
        ventService.findById(req.params.id)
        .then(function(vent){
            res.json(vent);
        })
        .catch(function(err){
            console.log(err);
    });
    

});

module.exports = router;
