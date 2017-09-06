var twit = reqire('twit');
var config = require('./config.js');

var Twitter = new twit(config);

var retweet = function() {
  var params = {
    q: '#BreakingNews #Breaking #News #EagleCreekFire, #Troutdale #evacuation #ColumbiaGorgeFire, ',
    result_type:'recent, News',
    lang:'en'
  }

  Twitter.get('search/tweets'. params, function(err, data){
    //if No errors
    if(!err){
      //GrabID of Tweet to retweet
      var retweetId = data.statuses[0].id_str;
      //tell TWITTER to retweetId
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response){
        if (response){
          console.log('Retweeted!');
        }
        // if there was an error while tweeting
        if( err){
          console.log('something went wrong while RETWEETING, duplicate maybe');
        }

      });
    }
    else {
      console.log('something went wrong while searching');
    }
  });
}

//grab and retweet
retweet();

//retweet every 50 main
setInterval(retweet, 3000000);
