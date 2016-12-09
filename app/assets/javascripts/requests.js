function Request() {
  this.type = '';
  this.url = '';
  this.data = {};
  this.dataType = 'json';
  this.success = function(response){
  }
  this.error = function(response){
  }
};

//------------------ Create User --------------------

function createUser(username, email, password, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'POST';
  newRequest['url'] = 'api/v1/users';
  newRequest['data'] = {
    'user': {
      'username': username,
      'email': email,
      'password': password
    }
  };
  newRequest['success'] = function(response){
    console.log(response);
    return callback();
  };

  $.ajax(newRequest);
};

//------------------ Signing In -----------------------

function signInUser(username, password, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'POST';
  newRequest['url'] = 'api/v1/sessions';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['data'] = {
    'user': {
      'username': username,
      'password': password
    }
  };
  newRequest['success'] = function(response){
    console.log(response);
    return callback();
  };

  $.ajax(newRequest);
};

//------------------- Logging Out ---------------------

function logoutUser(callback) {
  var newRequest = new Request();
  newRequest['type'] = 'DELETE';
  newRequest['url'] = 'api/v1/sessions';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['success'] = function(response){
    console.log(response);
    return callback();
  };

  $.ajax(newRequest);
}

//------------------ Authenticate ---------------------

function authenticate(sucessCB,errorCB) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/v1/authenticated';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['success'] = function(response){
    console.log(response);
    return successCB(response);
  };
  newRequest['error'] = function(request, errorMessage) {
    return errorCB(errorMessage);
  }

  $.ajax(newRequest);
};

//---------------------- Tweets -----------------------

//------------------- Post a Tweet --------------------
function postTweet(msg, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'POST';
  newRequest['url'] = 'api/v1/tweets';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['data'] = {
    'tweet': {
      'message': msg
    }
  };
  newRequest['success'] = function(response){
    console.log(response);
    return callback({'success': true});
  };

  $.ajax(newRequest);
};

//------------------- Get all Tweets ------------------

function getAllTweets(callback) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/v1/tweets';
  newRequest['success'] = function(response){
    return callback(response);
  };

  $.ajax(newRequest);
};

//----------------- Get tweet by ID --------------------

function getOneTweet(id) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/v1/tweets/' + id;
  newRequest['success'] = function(response){
    console.log(response);
  };

  $.ajax(newRequest);
};

//------------- Get All Tweets by Username -------------

function getUserTweets(username, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/v1/users/' + username + '/tweets';
  newRequest['success'] = function(response){
    console.log(response);
    return callback(response);
  };

  $.ajax(newRequest);
};

//---------------- Delete a tweet by ID ----------------

function deleteOneTweet(id, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'DELETE';
  newRequest['url'] = 'api/v1/tweets/' + id;
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['success'] = function(response){
    console.log(response);
    return callback();
  };

  $.ajax(newRequest);
};

//--------------- Search Tweet by Keyword --------------

function searchTweets(keyword, callback) {
  var newRequest = new Request();
  newRequest['type'] = "GET";
  newRequest['url'] = "api/v1/tweets/search/"+keyword; 
  newRequest["success"] = function(response){
    console.log(response);
    return callback(response);
  };

  $.ajax(newRequest);
};
