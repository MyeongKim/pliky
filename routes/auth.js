/**
 * Created by nuko on 2015. 6. 29..
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('../config/passport');

var CommitModel = require('../models/model.js').CommitModel;
var UserModel = require('../models/model.js').UserModel;

router.get('/facebook',
    passport.authenticate('facebook', { scope: 'email'}));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });

router.get('/twitter',
    passport.authenticate('twitter', { scope : 'email' }));

router.get('/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/google',
    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email'}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;