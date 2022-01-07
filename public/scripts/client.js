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
      $("main").prepend('<br><center><div class="error"><i class="fas fa-exclamation-triangle"></i>Text too long!</div></center>');
      event.preventDefault();
    } else if (count < 1) {
      $("main").prepend('<br id="error"><center id="for-error"><div class="error"><i class="fas fa-exclamation-triangle"></i>Text is empty!</div></center>');
      event.preventDefault();
    } else {
      if ($("#error")) {
        $("#error").remove();
        $("#for-error").remove();
        $("div.error").remove();
      };
      event.preventDefault();
      let data = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data})
      .done(function() {
        $("textarea").val("");
        loadTweets();
      });
    }
  })

  //CREATING DYNAMIC TWEETS
  const createTweetElement = (tweetData) => {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = `
    <br>
      <article class="tweet-box">
        <header>
          <img src=${escape(tweetData.user.avatars)}/>
          <p class="name">${escape(tweetData.user.name)}</p>
          <p class="handle">${escape(tweetData.user.handle)}</p>
        </header>
        <p class="tweet"><b>${escape(tweetData.content.text)}</b></p>
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