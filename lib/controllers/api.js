'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Item = mongoose.model('Item'),
    Maininfo = mongoose.model('Maininfo'),
    Category = mongoose.model('Category'),
    Size = mongoose.model('Size'),
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

  var   categoryID = req.query.category
      , cursorPointer = req.query.cursor
      , numItems = req.query.numItems
      ;

  if(categoryID){
    
    var query = Item.find({$or : [ {category:categoryID}, {subcategory:categoryID}] })
    .sort({date: -1})
    .skip(cursorPointer)
    .limit(numItems);

    Item.count({}, function( err, total){
      if(!err){
        query.execFind(function(err, items) {
          if (!err) {
            return res.json({total: total, data: items});
          } else {
            return res.send(err);
          }
        });
      }else{
        return res.send(err);
      }
    });
  }else{

    var query = Item.find({})
    .sort({date: -1})
    .skip(cursorPointer)
    .limit(numItems);

    Item.count({}, function( err, total){
      if(!err){
        query.execFind(function(err, items) {
          if (!err) {
            return res.json({total: total, data: items});
          } else {
            return res.send(err);
          }
        });
      }else{
        return res.send(err);
      }
    });
  }
  
};

/* Search items */
exports.item.search = function(req, res) {

  var   searchKey = req.query.searchkey
      , cursorPointer = req.query.cursor
      , numItems = req.query.numItems
      ;

  var query = Item.find( { $or : [ 
        { 'name' : {'$regex' : '.*' + searchKey + '.*', $options: 'i'} }
      , { 'description' : {'$regex' : '.*' + searchKey + '.*', $options: 'i'} }
      , { 'shortDescription' : {'$regex' : '.*' + searchKey + '.*', $options: 'i'} }
    ]})
    .sort({date: -1})
    .skip(cursorPointer)
    .limit(numItems);

    Item.count({ $or : [ 
        { 'name' : {'$regex' : '.*' + searchKey + '.*', $options: 'i'} }
      , { 'description' : {'$regex' : '.*' + searchKey + '.*', $options: 'i'} }
      , { 'shortDescription' : {'$regex' : '.*' + searchKey + '.*', $options: 'i'} }
    ]}, function( err, total){
      if(!err){
        query.execFind(function(err, items) {
          if (!err) {
            return res.json({total: total, data: items});
          } else {
            return res.send(err);
          }
        });
      }else{
        return res.send(err);
      }
    });
  
};

/* Get all items */
exports.item.favourites = function(req, res) {

  var   categoryID = req.query.category
      , cursorPointer = req.query.cursor
      , numItems = req.query.numItems
      ;

  var query = Item.find({ 'favourite' : true })
    .sort({date: -1})
    .skip(cursorPointer)
    .limit(numItems);

    Item.count({}, function( err, total){
      if(!err){
        query.execFind(function(err, items) {
          if (!err) {
            return res.json({total: total, data: items});
          } else {
            return res.send(err);
          }
        });
      }else{
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
  newItem.date = new Date().getTime();
  
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
      date: (newItem.date) ? newItem.date : new Date().getTime(),
      name: (newItem.name) ? newItem.name : "",
      favourite : (newItem.favourite) ? newItem.favourite : false,
      category : (newItem.category) ? newItem.category : -1,
      subcategory : (newItem.subcategory) ? newItem.subcategory : -1,
      shortDescription: (newItem.shortDescription) ? newItem.shortDescription : "",
      stock: (newItem.stock) ? newItem.stock : [],
      totalStock: (newItem.totalStock) ? newItem.totalStock : 0,
      description: (newItem.description) ? newItem.description : "",
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
 * Update stock array items
 */
exports.item.updateStocks = function (req, res) {
  var stocks = req.body.stocks;

  var updateStockItem = function( p_index ){
    Item.update({ 
        _id: stocks[p_index].iditem
      , "stock.size._id" : stocks[p_index].idstock
    },
    {
      "stock.$.amount" : parseInt(stocks[p_index].quantity)
    },
    { multi : false },
    function (err, p_item) {
      if (err) {
        res.send(500, err);
      } else {
        if( (p_index + 1) < stocks.length ){
          updateStockItem(p_index+1);
        }else{
          res.send(200);
        }
      }
    });
  };

  console.log(stocks[0].iditem);

  if(stocks){
    updateStockItem(0);
  }else{
    res.send(500, "there aren't enough params");
  }
  

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
      var _itemupdated = p_item;
      if (err) {
        res.send(500, err);
      } else {
          if(newItem.removeId){
            Item.update({ "category" : newItem.removeId }, 
              { "$set" : { "category": -1, "subcategory" : -1 }},
              function (err, p_article) {
                if (err) {
                  res.send(500, err);
                } else {
                  res.json(_itemupdated);
                }
            });
          }else{
            res.json(p_item);
          }            
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

/**
* Size services
**/
exports.size = {};

/* Get all sizes */
exports.size.all = function(req, res) {
  return Size.find(function (err, items) {
    if (!err) {
      return res.json(items);
    } else {
      return res.send(err);
    }
  });
};

/* Show size details */
exports.size.show = function (req, res, next) {
  var sizeId = req.params.id;

  Size.findById(sizeId, function (err, item) {
    if (err) return next(new Error('Failed to load size'));
  
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
exports.size.create = function (req, res, next) {
  var newSize = new Size(req.body);
  newSize.provider = 'local';

  newSize.save(function(err) {
    if (err) {
      return res.json(400, err);
    }
    return res.send(200);
  });
};

/**
 * Update size
 */
exports.size.save = function (req, res, next) {
  var newSize = req.body;

  Size.update({ _id: req.body._id },
    {
      name: (newSize.name) ? newSize.name : "",
      value: (newSize.description) ? newSize.description : "",
      type: (newSize.price) ? newSize.type : 0,
      width: (newSize.width) ? newSize.width : 0,
      height : (newSize.height) ? newSize.height : 0,
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
 * Remove size
 */
exports.size.delete = function (req, res, next) {
  Size.remove({ _id: req.params.id },
    function (err, p_item) {
      if (err) {
        res.send(500, err);
      } else {
        res.send(200);
      }
  });
};