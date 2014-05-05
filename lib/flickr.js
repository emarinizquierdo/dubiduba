'use strict';

var flickr = require('flickr-with-uploads');
var fs = require('fs');
var formidable = require('formidable');

/*
var api = flickr(
		'3f6344f12e78f1ab9e72da90312d8e90', // consumer_key
		'b8d38e251ab1f5e9', // consumer_secret
		'72157641330138724-b261ab6298f9cdac', // oauth_token
		'a3fe3c53acceb828'); // oauth_token_secret
*/

var api = flickr(
		'786150f03ddf503b63ad2ad6a4f7153b',
		'e54f039be09e2fb7',
		'72157641341143115-8b1d4c33bd83142e',
		'c22b5e07ab52dad2');

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  upload: function(req, res, next) {

	var filePath = __dirname + '/temp.png';

 	var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
    	console.log(fields);
    	console.log(files);
    	fs.writeFile(filePath, files, function(){
    	});
    });

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        _sendToFlickr(this.openedFiles[0].path);
    });

	function _sendToFlickr(p_file){

		var _photoStream = fs.createReadStream(p_file);

		api({
		  method: 'upload',
		  title: 'Dubi Duba',
		  description: 'Dubi Duba',
		  is_public: 1,
		  is_friend: 1,
		  is_family: 1,
		  hidden: 2,
		  photo: _photoStream
		}, function(err, response) {
		  if (err) {
		    console.error('Could not upload photo:', err);
		    //console.log(response);
		    res.send(500);
		  }
		  else {
		    var new_photo_id = response.photoid[0];
		    console.log(new_photo_id);
		    console.log(response);
		    // usually, the method name is precisely the name of the API method, as they are here:
		    api({method: 'flickr.photos.getInfo', photo_id: new_photo_id}, function(err, response) {
		      console.log('Full photo info:', response);
		      res.json(response);
		    });
		  }
		});

	}

  }

};