'use strict';

var flickr = require('flickr-with-uploads');
var fs = require('fs');

var api = flickr(
		'3f6344f12e78f1ab9e72da90312d8e90', // consumer_key
		'b8d38e251ab1f5e9', // consumer_secret
		'72157641330138724-b261ab6298f9cdac', // oauth_token
		'a3fe3c53acceb828'); // oauth_token_secret

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  upload: function auth(req, res, next) {
    
    //var fullpath = 'small_image.png';
	// the upload method is special, but this library automatically handles the
	// hostname change
	//var _base64file = fs.createReadStream(fullpath);

	//console.log(req);
	console.log('FIRST TEST: ' + JSON.stringify(req.files));

	var base64Data,
		binaryData;

	base64Data  =   req.photo.replace(/^data:image\/png;base64,/, "");
	base64Data  +=  base64Data.replace('+', ' ');
	binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

	fs.writeFile("out.png", binaryData, "binary", function (err) {
	    console.log(err); // writes out file without error, but it's not a valid image
	    _sendToFlickr();
	});


	function _sendToFlickr(){

		api({
		  method: 'upload',
		  title: 'My new pet: baby orca',
		  description: "Don't tell Seaworld!",
		  is_public: 0,
		  is_friend: 1,
		  is_family: 1,
		  hidden: 2,
		  photo: _base64file
		}, function(err, response) {
		  if (err) {
		    console.error('Could not upload photo:', err);
		    console.log(response);
		  }
		  else {
		    var new_photo_id = response.photoid._content;
		    console.log(_base64file);
		    // usually, the method name is precisely the name of the API method, as they are here:
		    api({method: 'flickr.photos.getInfo', photo_id: new_photo_id}, function(err, response) {
		      console.log('Full photo info:', response);
		    });
		  }
		});

	    res.send(200);
	}

  }

};