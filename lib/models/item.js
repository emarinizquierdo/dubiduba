'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Item Schema
 */
var ItemSchema = new Schema({
  date: Number,
  name: String,
  favourite: Boolean,
  category: Number,
  subcategory: Number,
  shortDescription: String,
  description: String,
  stock: [],
  totalStock: Number,
  price: Number,
  photos: [],
  tags: [],
  sizeSelected: {},
  size: {}
});



mongoose.model('Item', ItemSchema);
