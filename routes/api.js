var express = require('express');
var router = express.Router();
var crawler = require('../crawler');

/*
  post api, the search
  req.body.q    the string that contains the hashtag
*/
router.post('/search', function(req, res, next) {
  crawler.searchHotWord(req.body.q, function(spots){
    res.json(spots);
  });
});

module.exports = router;
