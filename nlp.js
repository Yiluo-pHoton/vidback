var language = require('@google-cloud/language');

 var client = language({
    key: 'AIzaSyC9ohh_zyhW70aKqWR9QWbjrgMha3XqE6g'
 });

 var content = 'Hello, world!';
 var type = language.v1.types.Document.Type.PLAIN_TEXT;
 var document = {
     content : content,
     type : type
 };
 client.analyzeSentiment({document: document}).then(function(responses) {
     var response = responses[0];
     console.log(JSON.stringify(responses));
     // doThingsWith(response)
 })
 .catch(function(err) {
     console.error(err);
 });
