var express = require('express');
var router = express.Router();
var crawler = require('../crawler');

/*
  post api, the search
  req.body.q    the string that contains the hashtag
*/
router.pose('/search', function(req, res, next) {
  crawler.searchHashTag(req.body.q, function(tweets){
    // process the returning data
  });
});

module.exports = router;
