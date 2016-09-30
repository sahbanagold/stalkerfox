// app/routes.js
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'DAiENeEGNQDB4tEu324uPkri0',
  consumer_secret: 'PP0N4qSPWozT2nqC1IMO0hR8H1eN22y5WhjMpsxxXSpm8HMG19',
  access_token_key: '781716847532109824-PkMnL6wzAFzBRwXsz6WE0dOQ0aVlSqS',
  access_token_secret: 'bD7sv7kgyhpC1AFs5hWU6KUU4dnxXIUyIhjmEuGrNizGO'
});

module.exports = function(app, passport){
  app.get('/huhu', function(req, res){
    res.send(req.flash(''));
  });

  app.get('/', function(req, res){
    res.render('template/content_signin', { message: req.flash('loginMessage') });
  });

  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/hunt',
    failureRedirect: '/',
    failureFlash: true
  }));

  app.get('/signup', function(req, res){
    res.render('template/content_signup', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/hunt',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/search', isLoggedIn, function(req, res){
    if (req.query.q){
      client.get('users/search', {
        q: req.query.q,
        count: 1000,
        page:1
      }, function(error, users, response) {
        if (!error) {
          //users = JSON.parse(users)
          users.sort(function (vala,valb) {
            return valb.followers_count - vala.followers_count
          })
          res.render('template/content_dashboard_hunt', {
            users: users
          });
        }
      });
    } else {
      res.redirect('/hunt');
    }
  });

  app.get('/hunt', isLoggedIn, function(req, res, next) {
    res.render('template/content_dashboard_hunt', {
      users: []
    });
  });

  app.get('/prey', isLoggedIn, function(req, res, next) {
    res.render('template/content_dashboard_prey');
  });

  app.get('/signout', function(req, res, next) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}
