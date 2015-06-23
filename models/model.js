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
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Commit', CommitSchema);