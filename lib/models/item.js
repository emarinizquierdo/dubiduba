'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Item Schema
 */
var ItemSchema = new Schema({
  name: String,
  description: String,
  stock: Number,
  price: Number,
  photos: [],
  tags: []
});



mongoose.model('Item', ItemSchema);
