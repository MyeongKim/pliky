var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/enrollment', function (req, res, next) {
    res.render('enrollment');
});

router.post('/enrollment', function(req, res){
    var userName = req.body.userName;
    var html = 'Hello: ' + userName + '.<br>' +
        '<a href="/">Try again.</a>';
    res.send(html);
});

module.exports = router;
