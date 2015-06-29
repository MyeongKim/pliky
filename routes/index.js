// todo 아이템 하나 복수개, 단수개 테스트
// todo 그림 하나만 제출하면 for 문 안에서 에러남.
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var fs = require('fs');
var passport = require('passport');
var Grid = require('gridfs-stream');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var CommitModel = require('../models/model.js').CommitModel;
var UserModel = require('../models/model.js').UserModel;

mongoose.connect('mongodb://localhost:27017/test', function(err) {
	if(err) {
		console.log('connection error', err);
	} else {
		console.log('connection successful');
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
    CommitModel.find(function(err, data){
        if (err) return next(err);

        console.log("json data");
        console.log("length "+ data.length);
        console.log(data);

        // max length is 9.
        if( data.length > 9){
            data.slice(-9,-1);
        } else{
            res.render('index', {data : data, user: req.user});
        }
    });
});

router.get('/admin', function(req, res, next) {
    CommitModel.find(function (err, data) {
        if (err) return next(err);
        res.render('admin', {data : data});
    });
});

router.get('/signup', function(req, res, next){
    res.render('signup', {user: req.user});
});

router.post('/signup', function(req, res, next){
    UserModel.create(req.body, function (err, post) {
        if (err) return next(err);
        req.logIn(post, function(err) {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res, next){
    res.render('login', {state : '', user: req.user});
});

router.post('/login', function(req, res, next){

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log("aa");
            return res.redirect('/login')
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/forgot', function(req, res) {
    res.render('forgot', {
        user: req.user
    });
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            UserModel.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'ming3772@gmail.com',
                    pass: "I'llgotoyou"
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

router.get('/reset/:token', function(req, res) {
    UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', {
            user: req.user
        });
    });
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
            UserModel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function(err) {
                    req.logIn(user, function(err) {
                        done(err, user);
                    });
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'ming3772@gmail.com',
                    pass: "I'llgotoyou"
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', '비밀번호를 안전하게 변경하였습니다!');
                done(err);
            });
        }
    ], function(err) {
        res.redirect('/');
    });
});

router.get('/enrollment', function (req, res, next) {
    res.render('enrollment');
});

router.post('/enrollment', function(req, res){
	CommitModel.create(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

router.get('/mongodb', function(req, res, next) {
	CommitModel.findOne(function (err, data) {
		if (err) return next(err);
        res.type('png');
        res.send(data.file2.data);
		//res.json(data);
	});
});

router.all('/uploads', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);

    // image id array
    var imageId = [];
    var dirname = require('path').dirname(__dirname);
    var d = new Date();
    var fileTime = d.getTime();
    var conn = mongoose.createConnection('mongodb://localhost:27017/test');
    var writestream;
    async.waterfall([
            function(callback) {
                conn.once('open', function () {
                    var gfs = Grid(conn.db, mongoose.mongo);
                    for (var i in req.files.file2){
                        var filename = req.files.file2[i].name;
                        console.log(filename);
                        var path = req.files.file2[i].path;
                        var type = req.files.file2[i].mimetype;
                        var read_stream =  fs.createReadStream(dirname + '/bin/' + path);
                        imageId.push(filename);
                        writestream = gfs.createWriteStream({
                            filename: filename
                        });
                        read_stream.pipe(writestream);
                    }
                    writestream.on('close', function () {
                       callback(null, conn);
                    });
                });
            },
            function(conn, callback) {
                console.log("connection close");
                req.body.imageId = imageId;
                req.body.fileTime = fileTime;
                CommitModel.create(req.body, function (err, post) {
                    if (err) return next(err);
                    callback(null, conn);
                });
            }
        ],
        function(err, conn) {
            console.log(' upload success !');
            res.redirect("/admin");
            conn.close();
        });
});

router.get('/file/:id',function(req,res,next){
    var pic_id = req.params.id;
    var conn = mongoose.createConnection('mongodb://localhost:27017/test');

    conn.once('open', function () {
        var gfs = Grid(conn.db, mongoose.mongo);
        // all set!
        gfs.files.find({filename: pic_id}).toArray(function (err, files) {
            if (err) {
                res.json(err);
                conn.close();
            }
            if (files.length > 0) {
                var extension = pic_id.split('.')[1];
                var mime = 'image/' + extension;
                res.set('Content-Type', mime);
                var read_stream = gfs.createReadStream({filename: pic_id});
                read_stream.pipe(res);
                read_stream.on('end', function () {
                    conn.close();
                });
            } else {
                res.json('File Not Found');
                conn.close();
            }
        });
    });
});

module.exports = router;
