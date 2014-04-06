'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Sizes Schema
 */
var SizeSchema = new Schema({
  name: String,
  value: String,
  type: Number,
  width: Number,
  height: Number
});

mongoose.model('Size', SizeSchema);
