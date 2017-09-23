var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

client.get('search/tweets', {q: '#MakeAmericaGreatAgain'}, function(error, tweets, response) {
   console.log(tweets);
});
