'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Populate database with sample application data
 */

// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Dubiduba Admin',
    email: 'dubiduba@gmail.com',
    password: 'admin',
    role : 'admin',
    oauth_token: "72157641341143115-8b1d4c33bd83142e",
    oauth_token_secret: "c22b5e07ab52dad2",
  }, function() {
      console.log('finished populating users');
    }
  );
});
