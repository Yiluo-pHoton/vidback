var express = require('express');
var router = express.Router();
var crawler = require('../crawler');
var nlp = require('../nlp.js');

/*
  post api, the search
  req.body.q    the string that contains the hashtag
*/
router.post('/search', function(req, res, next) {
  crawler.searchHotWord(req.body.q, function(spots){
    spots.forEach(function(spot){
      spot.statuses.forEach(status){
        nlp.getSentiment(status.text, function(){
          // save the sentiment
          // return to the client when eveyrhing's ready
        });
      }
    });
    res.json(spots);
  });
});

module.exports = router;
