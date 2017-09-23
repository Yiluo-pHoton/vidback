var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});


var self = {};

self.searchHashTag = function(qStr, callback){
  client.get('search/tweets', {q: qStr}, function(error, tweets, response) {
     console.log(tweets);
     callback(tweets);
  });
}

module.exports = self;
