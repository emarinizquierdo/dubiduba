'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Maininfo Schema
 */
var MaininfoSchema = new Schema({
  mainbannertitle: String,
  mainbannersubtitle: String,
  facebooklink: String,
  twitterlink: String,
  photos: [],
});

mongoose.model('Maininfo', MaininfoSchema);