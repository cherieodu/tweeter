/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  $("form").submit(function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    console.log(data);
    $.ajax('/tweets', { method: 'POST', data});
  })




  //CREATING DYNAMIC TWEETS
  const createTweetElement = (tweetData) => {
    const $tweet = `
    <br>
      <article class="tweet-box">
        <header>
          <img src=${tweetData.user.avatars}/>
          <p class="name">${tweetData.user.name}</p>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <p class="tweet"><b>${tweetData.content.text}</b></p>
        <hr>
        <footer>
          <p>${tweetData.created_at}</p>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `
    return $tweet;
  };

  const renderTweets = (data) => {
    for (let tweetData of data) {
      const $tweet = createTweetElement(tweetData);
      $('article.tweets-container').append($tweet);
    }
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  
  renderTweets(data);
  
});