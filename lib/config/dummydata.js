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
    name: 'Eduardo Marín Izquierdo',
    email: 'e.marin.izquierdo@gmail.com',
    password: '79677967',
    role : 'admin',
  }, function() {
      console.log('finished populating users');
    }
  );
});
