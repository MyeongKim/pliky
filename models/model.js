/**
 * Created by nuko on 2015. 6. 15..
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-paginate');

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
    viewNum : {type : Number, default : 0},
    updated_at: { type: Date, default: Date.now },
    _creator : { type: String, ref: 'Person' },
    fans     : [{ type: String, ref: 'Person' }]
});

var UserSchema = new mongoose.Schema({
    email : { type: String, required: false, unique: true },
    twitterUsername : { type : String, unique : true},
    nickname : { type : String, default : "IamUser"},
    password : { type: String, required: false },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    signupToken: String,
    signupExpires : Date,
    valid : { type: Boolean, default: true },
    //passwordHash : String,
    //passwordSalt : String,
    following : [String],
    follower : [String],
    profileImg : [String],
    commits : [{ type: Schema.Types.ObjectId, ref: 'Commit' }]
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

module.exports = {
    CommitModel : Commit,
    UserModel : User,
};