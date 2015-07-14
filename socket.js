/**
 * Created by nuko on 2015. 7. 14..
 */
var mongoose = require('mongoose');
var CommitModel = require('./models/model.js').CommitModel;
var UserModel = require('./models/model.js').UserModel;

module.exports = {

    heartPlus : function(csId , userId){
            CommitModel.findOne({_id : csId}).exec(function (err,data) {
                    CommitModel.update({_id : csId}, { $push: {"fans": userId}}).exec(function (err, data) {
                        if (err) return next(err);
                        console.log("push success");
                        console.log(data);
                    });
            });
    }

};
