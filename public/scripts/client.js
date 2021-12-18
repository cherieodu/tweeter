/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET', dataType: 'json', success: function(data) {
      renderTweets(data);
     }})
  };

  //FORM SUBMISSION USING JQUERY/AJAX
  $("form").submit(function(event) {
    let count = 140 - $("output").text();
    if (count > 140) {
      alert('Text too long');
      event.preventDefault();
    } else if (count < 1) {
      alert('Text is empty');
      event.preventDefault();
    } else {
      event.preventDefault();
      let data = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data})
      .done(loadTweets);
    }
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
          <p>${timeago.format(tweetData.created_at)}</p>
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
      $('article.tweets-container').prepend($tweet);
    }
  };

  loadTweets();
});