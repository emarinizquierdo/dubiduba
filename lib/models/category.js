'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Item Schema
 */
var CategoriesSchema = new Schema({
  categories: []
});

mongoose.model('Category', CategoriesSchema);
