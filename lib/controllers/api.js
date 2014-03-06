'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Item = mongoose.model('Item'),
    Maininfo = mongoose.model('Maininfo'),
    Category = mongoose.model('Category'),
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
      favourite : (newItem.favourite) ? newItem.favourite : false,
      description: (newItem.description) ? newItem.description : "",
      stock: (newItem.stock) ? newItem.stock : 0,
      price: (newItem.price) ? newItem.price : 0,
      tags: (newItem.tags) ? newItem.tags : [],
      sizeSelected: (newItem.sizeSelected) ? newItem.sizeSelected : {},
      size : (newItem.size) ? newItem.size : {},
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

/**
 * Remove item
 */
exports.item.delete = function (req, res, next) {
  Item.remove({ _id: req.params.id },
    function (err, p_item) {
      if (err) {
        res.send(500, err);
      } else {
            res.send(200);
      }
  });
};

/**
* Main Info services
**/
exports.maininfo = {};

/* Get all items */
exports.maininfo.all = function(req, res) {
  return Maininfo.find(function (err, items) {
    if (!err) {
      return res.json(items);
    } else {
      return res.send(err);
    }
  });
};

/* Show maininfo details */
exports.maininfo.show = function (req, res, next) {
  var itemId = req.params.id;

  Maininfo.findById(itemId, function (err, item) {
    if (err) return next(new Error('Failed to load maininfo'));
  
    if (item) {
      return res.json(item);
    } else {
      res.send(404, 'ITEM_NOT_FOUND');
    }
  });
};

/**
 * Create maininfo
 */
exports.maininfo.create = function (req, res, next) {
  var newItem = new Maininfo(req.body);
  newItem.provider = 'local';

  newItem.save(function(err) {
    if (err) {
      return res.json(400, err);
    }
    return res.send(200);
  });
};

/**
 * Update maininfo
 */
exports.maininfo.save = function (req, res, next) {
  var newItem = req.body;

  Maininfo.update({ _id: req.body._id },
    {
      mainbannertitle: (newItem.mainbannertitle) ? newItem.mainbannertitle : "",
      mainbannersubtitle: (newItem.mainbannersubtitle) ? newItem.mainbannersubtitle : "",
      facebooklink: (newItem.facebooklink) ? newItem.facebooklink : "",
      twitterlink: (newItem.twitterlink) ? newItem.twitterlink : "",
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

/**
* Category services
**/
exports.category = {};

/* Get all categories */
exports.category.all = function(req, res) {
  return Category.find(function (err, items) {
    if (!err) {
      return res.json(items);
    } else {
      return res.send(err);
    }
  });
};

/* Show category details */
exports.category.show = function (req, res, next) {
  var itemId = req.params.id;

  Category.findById(itemId, function (err, item) {
    if (err) return next(new Error('Failed to load category'));
  
    if (item) {
      return res.json(item);
    } else {
      res.send(404, 'ITEM_NOT_FOUND');
    }
  });
};

/**
 * Create category
 */
exports.category.create = function (req, res, next) {
  var newItem = new Category(req.body);
  newItem.provider = 'local';

  newItem.save(function(err) {
    if (err) {
      return res.json(400, err);
    }
    return res.send(200);
  });
};

/**
 * Update category
 */
exports.category.save = function (req, res, next) {
  var newItem = req.body;

  Category.update({ _id: req.body._id },
    {
      categories: (newItem.categories) ? newItem.categories : []
    },
    function (err, p_item) {
      if (err) {
        res.send(500, err);
      } else {
            res.json(p_item);
      }
  });
};

/**
 * Remove category
 */
exports.category.delete = function (req, res, next) {
  Category.remove({ _id: req.params.id },
    function (err, p_item) {
      if (err) {
        res.send(500, err);
      } else {
            res.send(200);
      }
  });
};
