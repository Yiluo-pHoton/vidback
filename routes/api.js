var express = require('express');
var router = express.Router();
var crawler = require('../crawler');
var nlp = require('../nlp.js');

/*
  post api, the search
  req.body.q    the string that contains the hashtag
*/
router.post('/search', function(req, res, next) {
  console.log('request received');
  crawler.searchHotWord(req.body.q, function(isSuccess,spots){
    if(!isSuccess){
      res.status(403).json({err_msg: 'Quota Exceeded'});
      return;
    }

    let numPending = 0;
    let isEmpty = true;
    spots.forEach(function(spot, spot_index){
      if(spot.statuses){
        isEmpty = false;
        let sentiment_fail = false;

        spot.statuses.forEach(function(status, status_index){
          numPending ++;
          nlp.getSentiment(status.text, function(isSuccess, result){
            if(!isSuccess){
              if(!sentiment_fail){
                res.status(403).json({err_msg: 'Quota Exceeded for Google'});
                sentiment_fail = true;
              }
              return;
            }
            spots[spot_index].statuses[status_index].sentiment = result;

            numPending --;
            if(numPending == 0){
              res.json(spots);
            }
          });
        });
      }
    });

    if(isEmpty){
      console.log('no content');
      res.json(spots);
    }
  });
});

module.exports = router;
