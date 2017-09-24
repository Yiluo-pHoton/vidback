var Twitter = require('twitter');
var nlp = require('./nlp');
var fs = require('fs');
var cities = require('./data/cities.json');

var client = new Twitter({
  consumer_key: '4rEXgKnvdf9EVLwPSpdoUQ3LP',
  consumer_secret: 'boN9DKUyhA8sKQaKgvVBkPuMurkMvK3qiTk42odcYULHd4SZKm',
  access_token_key: '2445009181-PpmYgXDl1sUJ87MsYaTZ1cDNOiZsRHgYOfpwR9t',
  access_token_secret: 'tyG1X0MxrJJLyVA2lBR0lno2riAdBXbXFcAuYDXyz5NE6'
});




client.get('search/tweets', {q: '', geocode: '37.757815,-122.5076404,1000km', lang: 'en', count: 100}, function(error, tweets, response) {
  if(!!!tweets.statuses){
    console.log('request failure');
    return;
  }

  var count = tweets.statuses.length;

  tweets.statuses.forEach(function(status, index){
    nlp.getSentiment(status.text, function(isSuccess, entiment){
      tweets.statuses[index].sentiment = sentiment;
      count--;
      if(count <= 0){
        // store everything to the file
        var outbuffer = [];
        for(var i = 0; i < tweets.statuses.length; i++){
          let sentiment = tweets.statuses[i].sentiment;
          let content = tweets.statuses[i].text;
          outbuffer.push([[sentiment.score, sentiment.magnitude], content]);
        }

        fs.writeFile('./sampledata.json', JSON.stringify(outbuffer), function(err) {
          if(err) {
            return console.log(err);
          }

          console.log("The file was saved! size: "+tweets.statuses.length);
        });
      }
    });
  });
});
