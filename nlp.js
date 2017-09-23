var language = require('@google-cloud/language');

var client = language({
  projectId: 'my-project-1500315065039',
  keyFilename: './credentials/MyProject-b522b47ba2dc.json'
});

var self = {};

/*
  @param content the string that contains the content sentence
  @param callback the callback function that returns the data
*/
self.getSentiment = function(content, callback){
  client.analyzeSentiment({document: {type: 'PLAIN_TEXT', content: content}}).then(function(responses) {
    console.log(JSON.stringify(responses));
  })
  .catch(function(err) {
    console.error(err);
  });

}
