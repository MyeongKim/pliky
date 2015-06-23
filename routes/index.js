var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
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
//
//router.all('/uploads', function(req, res, next) {
//    console.log(req.body);
//    console.log(req.files);
//
//    // image id array
//    var imageId = [];
//    var dirname = require('path').dirname(__dirname);
//    var d = new Date();
//    var fileTime = d.getTime();
//    async.waterfall([
//            function(callback) {
//                var conn = mongoose.createConnection('mongodb://localhost:27017/test');
//                conn.once('open', function () {
//                    var gfs = Grid(conn.db, mongoose.mongo);
//
//                    for (var i in req.files.file2){
//                        var filename = req.files.file2[i].name;
//                        console.log(filename);
//                        var path = req.files.file2[i].path;
//                        var type = req.files.file2[i].mimetype;
//                        console.log("testest");
//                        var read_stream =  fs.createReadStream(dirname + '/bin/' + path);
//                        var fullName = filename+fileTime;
//                        imageId.push(fullName);
//                        console.log("testest");
//                        var writestream = gfs.createWriteStream({
//                            filename: filename
//                        });
//                        console.log("testest");
//                        read_stream.pipe(writestream).on('end', function () {
//                            console.log();
//                        });
//                        console.log("testest");
//                    }
//                    callback(null);
//                });
//
//            },
//            function(callback) {
//                req.body.imageId = imageId;
//                Model.create(req.body, function (err, post) {
//                    if (err) return next(err);
//                });
//                callback(null);
//            }
//        ],
//        function(err) {
//            console.log(' upload success !');
//            res.send("good");
//        });
//});
//

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
            filename: filename
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
                var extension = pic_id.split('.')[1];
                var mime = 'image/' + extension;
                res.set('Content-Type', mime);
                var read_stream = gfs.createReadStream({filename: pic_id});
                read_stream.pipe(res);
            } else {
                res.json('File Not Found');
            }
        });
    });
});
module.exports = router;
