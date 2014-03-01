'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Item = mongoose.model('Item'),
    ObjectId = require('mongoose').Types.ObjectId;

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
  var newItem = req.body;

  Item.update({ _id: req.body._id },
    {
      name: (newItem.name) ? newItem.name : "",
      description: (newItem.description) ? newItem.description : "",
      stock: (newItem.stock) ? newItem.stock : 0,
      price: (newItem.price) ? newItem.price : 0,
      tags: (newItem.tags) ? newItem.tags : [],
      photos: (newItem.photos) ? newItem.photos : []
    },
    { multi : false },
    function (err, p_item) {
      if (err) {
        res.send(500, err);
      } else {
            res.json(p_item);
      }
  });
};


