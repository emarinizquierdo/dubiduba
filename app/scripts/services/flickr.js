'use strict';

angular.module('dubidubaApp')
  .service('Flickr', ['$http', function Flickr($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
	    uploadPhoto : function(file, uploadUrl, p_success, p_error){

	    	/*
	    	var	_url = "https://up.flickr.com/services/upload/", 
	    		_accessToken = "72157641341143115-8b1d4c33bd83142e",
				_apiKey = "bcb1e44260364b1bf6294f00a4cd1cb4",
				_accessTokenSecret = "c22b5e07ab52dad2";

			var _headers = {
			    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			};

			var _tokens = {
			  "oauth_token": "72157641341143115-8b1d4c33bd83142e",
			  "oauth_token_secret": "c22b5e07ab52dad2"
			}

			var aux = OAuth.create('flickr', _tokens);

			var _configuration = {
				photo : p_filestream
			}

			aux.post({
			    url: _url,
			    data: p_filestream
			}).done(function(data, status, headers, config) {
			    debugger
			})


myApp.service('$fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        
        var fd = new FormData();

        fd.append('api_key','786150f03ddf503b63ad2ad6a4f7153b');
        fd.append('auth_token','72157641341143115-8b1d4c33bd83142e');
        fd.append('api_sig','e49153eb9c86958c119cef82b0cdf2c2');
        fd.append('file', file);
                 
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
    */
/*
    var fd = new FormData();

    var _timestamp = new Date().getTime();
    var _nonce = hex_md5((new Date().getTime() * Math.random(1000) * 100000).toString());

	var httpMethod = 'GET',
    url = 'https://api.flickr.com/services/rest',
    parameters = {
        oauth_consumer_key : '786150f03ddf503b63ad2ad6a4f7153b',
        oauth_token : '72157641341143115-8b1d4c33bd83142e',
        oauth_nonce : _nonce,
        oauth_timestamp : _timestamp,
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0',
        method : 'flickr.test.login'
    },
    consumerSecret = 'e54f039be09e2fb7',
    encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret);

    fd.append('oauth_consumer_key', parameters.oauth_consumer_key);
    fd.append('oauth_nonce', parameters.oauth_nonce);
    fd.append('oauth_signature_method',parameters.oauth_signature_method);
    fd.append('oauth_timestamp', _timestamp);
    fd.append('oauth_token', parameters.oauth_token);
    fd.append('oauth_version', parameters.oauth_version);
    fd.append('oauth_signature',encodedSignature);
    fd.append('method', parameters.method);
    //fd.append('photo', file);
       /*          
    $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })
    .success(function(){
    })
    .error(function(){
    });*/

var consumer =
{ consumerKey    : "786150f03ddf503b63ad2ad6a4f7153b"
, consumerSecret : "e54f039be09e2fb7"
,token         : '72157641341143115-8b1d4c33bd83142e'
, tokenSecret   : 'c22b5e07ab52dad2'
, serviceProvider :
  { signatureMethod : "HMAC-SHA1" }
};


	var accessor = consumer;
    var message = {
        method: "post", action: 'http://api.flickr.com/services/upload'
      , parameters: []
    };

    var requestBody = OAuth.formEncode(message.parameters);
    OAuth.completeRequest(message, accessor);
    var authorizationHeader = OAuth.getAuthorizationHeader("", message.parameters);
/*
    var requestAccess = new XMLHttpRequest();
    requestAccess.onreadystatechange = function receiveAccessToken() {
        if (requestAccess.readyState == 4) {
            alert(requestAccess.status+" "+requestAccess.statusText
                  +"\n"+requestAccess.getAllResponseHeaders()
                  +"\n"+requestAccess.responseText);
        }
    };
    /*
    requestAccess.open(message.method, message.action, true); 
    requestAccess.setRequestHeader("Authorization", authorizationHeader);
    requestAccess.send();
            }
        }
    };*/
    /*
    requestToken.open(message.method, message.action, true); 
    requestToken.setRequestHeader("Authorization", authorizationHeader);
    //requestToken.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    requestToken.send(requestBody);
*/
 	$http.post(message.action, requestBody, {
        transformRequest: angular.identity,
        headers: {
        	  'Content-Type': undefined
        	//, 'Authorization': authorizationHeader
        }
    })
    .success(function(){
    })
    .error(function(){
    });

    }
}
}]);

