var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '4rEXgKnvdf9EVLwPSpdoUQ3LP',
  consumer_secret: 'boN9DKUyhA8sKQaKgvVBkPuMurkMvK3qiTk42odcYULHd4SZKm',
  access_token_key: '2445009181-PpmYgXDl1sUJ87MsYaTZ1cDNOiZsRHgYOfpwR9t',
  access_token_secret: 'tyG1X0MxrJJLyVA2lBR0lno2riAdBXbXFcAuYDXyz5NE6'
});


var self = {};

self.searchHashTag = function(qStr, callback){
  client.get('search/tweets', {q: qStr}, function(error, tweets, response) {
     console.log(tweets);
     callback(tweets);
  });
}

module.exports = self;