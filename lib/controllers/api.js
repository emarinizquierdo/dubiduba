'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Item = mongoose.model('Item');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

/**
*	Item services
**/
exports.item = {};

/* Get all items */
exports.item.all = function(req, res) {
  return Item.find(function (err, items) {
    if (!err) {
      return res.json(items);
    } else {
      return res.send(err);
    }
  });
};

/* Show Item details */
exports.item.show = function (req, res, next) {
  var itemId = req.params.id;

  Item.findById(itemId, function (err, item) {
    if (err) return next(new Error('Failed to load Item'));
  
    if (item) {
      return res.json(item);
    } else {
      res.send(404, 'ITEM_NOT_FOUND');
    }
  });
};

/**
 * Create item
 */
exports.item.create = function (req, res, next) {
  var newItem = new Item(req.body);
  newItem.provider = 'local';

  newItem.save(function(err) {
    if (err) {
      return res.json(400, err);
    }
    return res.send(200);
  });
};

/**
 * Update item
 */
exports.item.save = function (req, res, next) {
  var item = req.body;
  delete item._id;
  
  Item.findByIdAndUpdate(req.body._id, item, function (err, item) {
    if (err) {
      res.send(500, err);
    } else {
      res.send(200);
    }
  });
};