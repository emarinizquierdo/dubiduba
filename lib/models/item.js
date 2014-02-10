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
  photos: [
  {photoId : String, photoUrl : String}
  ],
  tags: []
});



mongoose.model('Item', ItemSchema);
