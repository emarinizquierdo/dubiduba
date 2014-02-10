'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
  },

  /**
   *  Protect routes on your api from unauthenticated role access
   */
  needsRole: function(role) {
    return function(req, res, next) {
      if(req.isAuthenticated() && req.user && req.user.role === role) return next();
        res.send(401);
    }
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  }

};
