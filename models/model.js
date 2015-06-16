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
    file1: { type: Buffer, contentType: String },
    file2: { type: Buffer, contentType: String },
    // todo 16MB 보다 큰 이미지는 GridFS 사용하기
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Commit', CommitSchema);