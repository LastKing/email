var express = require('express');
var router = express.Router();

var fs = require('fs');

var EmailHelper = require('../common/email_helper');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/sendMail.do', function (req, res, next) {

  fs.readFile("test.html", function (result) {


    console.log(result);

    EmailHelper.sendMail('120452272@qq.com');
  })


});

module.exports = router;
