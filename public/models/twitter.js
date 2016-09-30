// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var twitterSchema = new Schema({
  screen_name: { type: String, required: true, unique: true },
  statuses_count: { type: Number, required: true },
});

// the schema is useless so far
// we need to create a model using it
var Twitter = mongoose.model('Twitter', twitterSchema);

// make this available to our users in our Node applications
module.exports = Twitter;
