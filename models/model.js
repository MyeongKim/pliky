/**
 * Created by nuko on 2015. 6. 15..
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var CommitSchema = new mongoose.Schema({
    title: { type: String, default: "#" },
    description: { type: String, default: "#" },
    price: { type: String, default: "#" },
    reqNumber: { type: String, default: "#" },
    width: { type: String, default: "#" },
    height: { type: String, default: "#" },
    duedate: { type: String, default: "#" },
    imageId : [String],
    fileTime : {type: String, default : "#"},
    heart : {type : Number, default : 0},
    updated_at: { type: Date, default: Date.now },
});

var UserSchema = new mongoose.Schema({
    email : { type: String, required: true, unique: true },
    nickname : { type : String, default : "IamUser"},
    password : { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    //passwordHash : String,
    //passwordSalt : String,
    following : [String],
    follower : [String],
});

UserSchema.pre('save', function(next) {
    var user = this;
    var SALT_FACTOR = 5;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var Commit = mongoose.model('Commit', CommitSchema);
var User = mongoose.model('User', UserSchema);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done) {
    User.findOne({ email : email }, function(err, user) {
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

module.exports = {
    CommitModel : Commit,
    UserModel : User,
};