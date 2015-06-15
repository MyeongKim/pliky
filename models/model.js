/**
 * Created by nuko on 2015. 6. 15..
 */
var mongoose = require('mongoose');

var CommitSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    reqNumber: String,
    width: String,
    height: String,
    duedate: String,
    file1: String,
    file2: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Commit', CommitSchema);