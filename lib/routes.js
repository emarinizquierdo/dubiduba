'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');

var flickr = require('./flickr');

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
  app.put('/api/item', middleware.needsRole('admin'), api.item.save);
  app.put('/api/item/stocks', api.item.updateStocks);
  app.get('/api/item', api.item.all);
  app.get('/api/item/:id', api.item.show);
  app.del('/api/item/:id', middleware.needsRole('admin'), api.item.delete);

  //Favourite Item REST
  app.get('/api/search', api.item.search);

  //Favourite Item REST
  app.get('/api/favourites', api.item.favourites);

  //Maininfo REST
  app.post('/api/maininfo', middleware.needsRole('admin'), api.maininfo.create);
  app.put('/api/maininfo', middleware.needsRole('admin'), api.maininfo.save);
  app.get('/api/maininfo', api.maininfo.all);
  app.get('/api/maininfo/:id', api.maininfo.show);

  //Category REST
  app.post('/api/category', middleware.needsRole('admin'), api.category.create);
  app.put('/api/category', middleware.needsRole('admin'), api.category.save);
  app.get('/api/category', api.category.all);
  app.get('/api/category/:id', api.category.show);
  app.del('/api/category/:id', middleware.needsRole('admin'), api.category.delete);

  //Sizes REST
  app.post('/api/size', middleware.needsRole('admin'), api.size.create);
  app.put('/api/size', middleware.needsRole('admin'), api.size.save);
  app.get('/api/size', api.size.all);
  app.get('/api/size/:id', api.size.show);
  app.del('/api/size/:id', middleware.needsRole('admin'), api.size.delete);

  app.post('/flickr', flickr.upload);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);



};