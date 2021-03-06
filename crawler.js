var Twitter = require('twitter');
var cities = require('./data/cities.json');

// var client = new Twitter({
//   consumer_key: '4rEXgKnvdf9EVLwPSpdoUQ3LP',
//   consumer_secret: 'boN9DKUyhA8sKQaKgvVBkPuMurkMvK3qiTk42odcYULHd4SZKm',
//   access_token_key: '2445009181-PpmYgXDl1sUJ87MsYaTZ1cDNOiZsRHgYOfpwR9t',
//   access_token_secret: 'tyG1X0MxrJJLyVA2lBR0lno2riAdBXbXFcAuYDXyz5NE6'
// });

var client = new Twitter({
  consumer_key: '4rEXgKnvdf9EVLwPSpdoUQ3LP',
  consumer_secret: 'boN9DKUyhA8sKQaKgvVBkPuMurkMvK3qiTk42odcYULHd4SZKm',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAANO62QAAAAAANDqQJkIv14h23pQjpll3HSq5KAs%3D0oHDlDAvqPViylfRNCof7kj14OP99m7hPbHiklVF0R6Ajlvhp2'
});

var self = {};

self.searchHotWord = function(qStr, callback){

  const numCities = 50;
  var count = 0;
  var spots = [];
  var quota_exceeded = false;

  for(var i = 0; i < numCities; i++){
    let city = cities[i];
    var geoCodeStr = city.latitude+','+city.longitude+',90km';
    client.get('search/tweets', {q: qStr, geocode: geoCodeStr, lang:'en'}, function(error, tweets, response) {
      if(error){
        if(!quota_exceeded){
          console.log(error);
          callback(false);
          quota_exceeded = true;
        }
        return;
      }
      spots.push({
        lat: city.latitude,
        lng: city.longitude,
        statuses: tweets.statuses
      });
      count++;

      if(count >= numCities)
        callback(true, spots);
    });
  }
}

module.exports = self;
