var express = require('express');
var router = express.Router();
var crawler = require('../crawler');
var nlp = require('../nlp.js');

/*
  post api, the search
  req.body.q    the string that contains the hashtag
*/
router.post('/search', function(req, res, next) {
  try{
    crawler.searchHotWord(req.body.q, function(spots){
      let numPending = 0;
      let isEmpty = true;
      spots.forEach(function(spot){
        if(spot.statuses.length != 0)
          isEmpty = false;

        spot.statuses.forEach(function(status, index){
          numPending ++;
          nlp.getSentiment(status.text, function(result){
            statuses[index].sentiment = result;

            numPending --;
            if(numPending == 0){
              res.json(spots);
            }
          });
        });
      });

      if(isEmpty){
        console.log('no content');
        res.json(spots);
      }

      res.json(spots);
    });
  }
  catch(err){
    res.status(404).json({err_msg: 'Quota Exceeded'});
  }
});

module.exports = router;
