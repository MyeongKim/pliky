/**
 * Created by nuko on 2015. 7. 14..
 */
var mongoose = require('mongoose');
var CommitModel = require('./models/model.js').CommitModel;
var UserModel = require('./models/model.js').UserModel;

module.exports = {

    heartPlus : function(csId , userId){
        CommitModel.findOne({_id : csId}).exec(function (err,data) {
                CommitModel.update({_id : csId}, { $addToSet: {"fans": userId}}).exec(function (err, data) {
                    if (err) return next(err);
                    console.log("push success");
                    console.log(data);
                });
        });
    },

    cancelHeartPlus : function (csId, userId) {
        CommitModel.update({_id : csId}, { $pull: {"fans": userId}}, function(err,data){
            if (err) return next(err);
            console.log("pull success");
        });
    },

    viewPlus : function(csId){
        CommitModel.update({_id : csId},  { $inc: { viewNum: 1 }}, function(err,data){
            if (err) return next(err);
        });
    },

    csAlarmPlus : function (csId, userId){
        UserModel.update({_id : userId},  { $addToSet: {"csAlarm": csId}}, function(err,data){
            if (err) return next(err);
        });
    },
    cancelCsAlarmPlus : function (csId, userId){
        UserModel.update({_id : userId},  { $pull: {"csAlarm": csId}}, function(err,data){
            if (err) return next(err);
        });
    },
    followPlus : function (creatorId, userId){
        UserModel.update({_id : creatorId},  { $addToSet: {"follower": userId}}, function(err,data){
            if (err) return next(err);
            UserModel.update({_id : userId},  { $addToSet: {"following": creatorId}}, function(err,data){
                if (err) return next(err);
            });
        });

    },
    followMinus : function (creatorId, userId){
        UserModel.update({_id : creatorId},  { $pull: {"follower": userId}}, function(err,data){
            if (err) return next(err);
            UserModel.update({_id : userId},  { $pull: {"following": creatorId}}, function(err,data){
                if (err) return next(err);
            });
        });
    },
};
