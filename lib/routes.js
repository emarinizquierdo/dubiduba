'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {
 
  // Server API Routes//

  //User REST
  app.post('/api/users', users.create);
  app.put('/api/users', middleware.auth, users.changePassword);
  app.get('/api/users/me', middleware.auth, users.me);
  app.get('/api/users/:id', middleware.needsRole('admin'), users.show);

  //Session REST
  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  //Item REST
  app.post('/api/item', middleware.needsRole('admin'), api.item.create);
  app.get('/api/item', api.item.all);
  app.get('/api/item/:id', api.item.show);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);

};