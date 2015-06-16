var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var Grid = require('gridfs-stream');

var Model = require('../models/model.js');
mongoose.connect('mongodb://localhost:27017', function(err) {
	if(err) {
		console.log('connection error', err);
	} else {
		console.log('connection successful');
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
    Model.find(function (err, data) {
        if (err) return next(err);
        res.render('admin', {data : data});
    });
});

router.get('/enrollment', function (req, res, next) {
	res.render('enrollment');
});

router.post('/enrollment', function(req, res){
	Model.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

router.get('/mongodb', function(req, res, next) {
	Model.findOne(function (err, data) {
		if (err) return next(err);
        res.type('png');
        res.send(data.file2.data);
		//res.json(data);
	});
});

router.all('/uploads', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);

    var dirname = require('path').dirname(__dirname);
    var filename = req.files.file2.name;
    var path = req.files.file2.path;
    var type = req.files.file2.mimetype;

    var read_stream =  fs.createReadStream(dirname + '/bin/' + path);
    var conn = mongoose.createConnection('mongodb://localhost:27017/test');
    conn.once('open', function () {
        var gfs = Grid(conn.db, mongoose.mongo);
        // all set!
        var writestream = gfs.createWriteStream({
            filename: "test.png"
        });
        read_stream.pipe(writestream);
    });

    Model.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get('/file/:id',function(req,res){
    var pic_id = req.params.id;
    var conn = mongoose.createConnection('mongodb://localhost:27017/test');
    conn.once('open', function () {
        var gfs = Grid(conn.db, mongoose.mongo);
        // all set!
        gfs.files.find({filename: pic_id}).toArray(function (err, files) {
            if (err) {
                res.json(err);
            }
            if (files.length > 0) {
                var mime = 'image/png';
                res.set('Content-Type', mime);
                var read_stream = gfs.createReadStream({filename: pic_id});
                read_stream.pipe(res);
            } else {
                res.json('File Not Found');
            }
        });
    });
});

// todo req.file 받아서 images db에 저장
// todo file name 을 image id로 변경
// todo images db 와 FK로 연결
// todo image id 로 이미지 불러오기 (url rest 형식)
// todo admin page 에서 이미지 불러오기 (FK 통해 불러오기)

module.exports = router;
