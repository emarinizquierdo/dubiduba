'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Item Schema
 */
var ItemSchema = new Schema({
  name: String,
  favourite: Boolean,
  description: String,
  stock: Number,
  price: Number,
  photos: [],
  tags: [],
  sizeSelected: {},
  size: {}
});



mongoose.model('Item', ItemSchema);
