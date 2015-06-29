/*!
 * Module dependencies.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserModel = require('../models/model.js').UserModel;


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'email'}, function(email, password, done) {
    UserModel.findOne({ email : email }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));

passport.use(new FacebookStrategy({
        clientID: 735710646555937,
        clientSecret: '64b113d6ba8e77df8c692babb7b434e5',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        enableProof: false,
        profileFields: ['id', 'name','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
    },
    function(accessToken, refreshToken, profile, done) {
        UserModel.findOne({ email : profile.emails[0].value }, function (err, user) {
            if (err) { return done(err) }
            if (!user) {
                console.log(profile);
                user = new UserModel({
                    email: profile.emails[0].value
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user)
                });
            }
            else {
                return done(err, user)
            }
        })
    }
));

passport.use(new TwitterStrategy({
        consumerKey: 'mH5FdoNWiCGbm7zQhbkndz2Uq',
        consumerSecret: '1ibDvGe7kWtYzMcgwATom2PByWscMJsSt7rhexFs3gzXElOzOT',
        callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        UserModel.findOne({ twitterUsername : profile.username }, function (err, user) {
            if (err) { return done(err) }
            if (!user) {
                console.log(profile);
                user = new UserModel({
                    twitterUsername : profile.username,
                    nickname : profile.displayName
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user)
                });
            }
            else {
                return done(err, user)
            }
        });
    }
));

passport.use(new GoogleStrategy({
        clientID: '842403441374-d08rlgec5md0jkk5e4cfjrd1s46e8gje.apps.googleusercontent.com',
        clientSecret: 'RgKOxfFlWSdw9ndg4-AK9S0E',
        callbackURL: "http://127.0.0.1:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        UserModel.findOne({ email : profile.emails[0].value }, function (err, user) {
            if (err) { return done(err) }
            if (!user) {
                console.log(profile);
                user = new UserModel({
                    email: profile.emails[0].value
                });
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user)
                });
            }
            else {
                return done(err, user)
            }
        })
    }
));

module.exports = passport;