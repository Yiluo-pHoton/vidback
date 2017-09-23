var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data/TwitterPlace.db');
var Twitter = require('twitter');
var cities = require('./data/cities.json');

var client = new Twitter({
  consumer_key: '4rEXgKnvdf9EVLwPSpdoUQ3LP',
  consumer_secret: 'boN9DKUyhA8sKQaKgvVBkPuMurkMvK3qiTk42odcYULHd4SZKm',
  access_token_key: '2445009181-PpmYgXDl1sUJ87MsYaTZ1cDNOiZsRHgYOfpwR9t',
  access_token_secret: 'tyG1X0MxrJJLyVA2lBR0lno2riAdBXbXFcAuYDXyz5NE6'
});

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS places (pid varchar(255), lat double, lng double, primary key(pid));');
});

var i = 0;

setInterval(function(){
  if(i == 50){
    console.log('Complete, press control+c to quit');
    db.close();
  }
  if(i >= 50)
    return;

  var city = cities[i];

  searchCity(city.city + ', ' + city.state, function(place){
    if(place){
      db.serialize(function(){
        try{
          db.run('INSERT INTO places VALUES (?,?,?)', [place.id, parseFloat(city.latitude), parseFloat(city.longitude)]);
        }
        catch(err){}
      });
    }
  });

  i++;
}, 60000);


var searchCity = function(cityName, callback){
  client.get('geo/search', {query: cityName, granularity: 'city'}, function(error, result, response) {
    // console.log(JSON.stringify(result));
     var place = result.result.places[0];

     if(place)
      console.log(place.id + ' ' + place.full_name);
      else {
        console.log('Not Found');
      }

     callback((result.result.places[0])?result.result.places[0]:null);
  });
}
