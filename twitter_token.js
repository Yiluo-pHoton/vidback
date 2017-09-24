


describe('OAuth2',function(){
  var OAuth = require('oauth');

   it('gets bearer token', function(done){
     var OAuth2 = OAuth.OAuth2;
     var twitterConsumerKey = '4rEXgKnvdf9EVLwPSpdoUQ3LP';
     var twitterConsumerSecret = 'boN9DKUyhA8sKQaKgvVBkPuMurkMvK3qiTk42odcYULHd4SZKm';
     var oauth2 = new OAuth2(
       twitterConsumerKey,
       twitterConsumerSecret,
       'https://api.twitter.com/',
       null,
       'oauth2/token',
       null);
     oauth2.getOAuthAccessToken(
       '',
       {'grant_type':'client_credentials'},
       function (e, access_token, refresh_token, results){
       console.log('bearer: ',access_token);
       done();
     });
   });
 });
