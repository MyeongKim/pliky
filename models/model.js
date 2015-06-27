/**
 * Created by nuko on 2015. 6. 15..
 */
var mongoose = require('mongoose');

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
    email : String,
    nickname : { type : String, default : "IamUser"},
    password : String,
    //passwordHash : String,
    //passwordSalt : String,
    following : [String],
    follower : [String],
});

module.exports = {
    CommitModel : mongoose.model('Commit', CommitSchema),
    UserModel : mongoose.model('User', UserSchema)
};