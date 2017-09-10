// dependencies ===========
//TwitterLibrary & Api configuration file
var twit = require('twit');
var config = require('./config.js');


var Twitter = new twit(config);

// Search variable. Currently query results EagleCreekFire, To change simply Rename the variable, from eaglecreeksearch, to yourTermSearch, and inside the query (Q: "change these aswell.")
var eagleCreekSearch = {q: "#EagleCreekFire", count: 100, result_type: "recent"};

// RetweetBot ====

function retweet() {
//Function finds latest Tweet with the #EagleCreekFire hashtag then retweets.

  Twitter.get('search/tweets', eagleCreekSearch, function(error, data){
    //log out any errors and responses.
    console.log(data);
    //if No errors during search..
    if(!error){
      // then take ID of Tweet to be retweeted
      var retweetId = data.statuses[0].id_str;
      //tell TWITTER to retweetId
      Twitter.post('statuses/retweet/' + retweetId, function(error, response){
        if (response){
          console.log('sucessfully Retweeted!', data);
        }
        // if there was an error while tweeting
        if(error){
          console.log('something went wrong while RETWEETING, Error', error);
        }

      });
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
// SetInterval set to 120 minutes, SetInterval takes miliseconds.
setInterval(retweet, 360000);
