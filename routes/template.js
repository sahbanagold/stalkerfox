var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template/content_signin');
});

router.post('/', function(req, res, next) {
  res.redirect('/template/hunt');
});

router.get('/signup', function(req, res, next) {
  res.render('template/content_signup');
});

router.get('/signout', function(req, res, next) {
  res.redirect('/template');
});

router.get('/hunt', function(req, res, next) {
  res.render('template/content_dashboard_hunt');
});

router.get('/prey', function(req, res, next) {
  res.render('template/content_dashboard_prey');
});

module.exports = router;
