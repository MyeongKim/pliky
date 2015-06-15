var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Model = require('../models/model.js');

mongoose.connect('mongodb://localhost:27017', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/enrollment', function (req, res, next) {
    res.render('enrollment');
});

router.post('/enrollment', function(req, res){
    var userName = req.body.userName;
    var html = 'Hello: ' + userName + '.<br>' +
        '<a href="/">Try again.</a>';
    Model.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
    //res.send(html);
});

router.get('/mongodb', function(req, res, next) {
    Model.find(function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

module.exports = router;
