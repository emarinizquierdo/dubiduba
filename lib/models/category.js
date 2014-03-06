'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Item Schema
 */
var CategoriesSchema = new Schema({
  name: String,
  children: []
});

mongoose.model('Category', CategoriesSchema);
