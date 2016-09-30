var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/stalkerfox');

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'DAiENeEGNQDB4tEu324uPkri0',
  consumer_secret: 'PP0N4qSPWozT2nqC1IMO0hR8H1eN22y5WhjMpsxxXSpm8HMG19',
  access_token_key: '781716847532109824-PkMnL6wzAFzBRwXsz6WE0dOQ0aVlSqS',
  access_token_secret: 'bD7sv7kgyhpC1AFs5hWU6KUU4dnxXIUyIhjmEuGrNizGO'
});



/* ====================================================
CRUD page for twitter screen names
==================================================== */

/* SEARCH by screen name */
router.get('/search', function(req, res, next) {
  if (req.query.search) {
    client.get('users/search', {
      q: req.query.search,
      count: 1000,
      page:1
    }, function(error, users, response) {
      if (!error) {
        //users = JSON.parse(users)
        users.sort(function (vala,valb) {
          return valb.followers_count - vala.followers_count
        })
        res.render('content/search', {
          users: users
        });
      }
    });
  } else {
    res.render('content/search', {
      users: ""
    });
  }
});

module.exports = router;
