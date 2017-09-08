// dependencies ===========
//TwitterLibrary & Api configuration file
var twit = require('twit');
var config = require('./config.js');


var Twitter = new twit(config);

// URL Search for most recent tweets on the '#EagleCreekFire' hashtag.
var eagleCreekSearch = {q: "#EagleCreekFire #News", count:100, result_type: " recent"};

// RetweetBot ====

function retweet() {
//Function finds latest Twet with the #EagleCreekFire hashtag then retweets.

  Twitter.get('search/tweets', eagleCreekSearch, function(error, data){
    //log out any errors and responses.
  console.log(error, data);
    //if No errors during search..
    if(!error){
      // then take ID of Tweet to be retweeted
      var retweetId = data.statuses[0].id_str;
      //tell TWITTER to retweetId
      Twitter.post('statuses/retweet/' + retweetId, { }, function(error, response){
        if (response){
          console.log('sucessfully Retweeted!');
        }
        // if there was an error while tweeting
        if(error){
          console.log('something went wrong while RETWEETING, Error', error);
        }

      })
    }
    // if unable to Search.
    else {
      console.log('something went wrong while SEARCHING.. Check hashtags', error);
    }
  });
}

// Attempt to find to retweet as soon as program is running.
retweet();

// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweet, 1000 * 60 * 60);
