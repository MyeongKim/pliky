
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var CommitModel = require('../models/model.js').CommitModel;
var UserModel = require('../models/model.js').UserModel;

router.get('/commitData', function (req,res) {

   res.send({"ss":11});
});

module.exports = router;