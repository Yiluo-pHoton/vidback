var svm = require('node-svm');
var emotion_model = require('./emotion_classifier.json');



var clf = svm.restore(emotion_model);

var self = {};

self.predict = function(input){
  var prediction = clf.predictSync(input);
  return prediction;
}

module.exports = self;
