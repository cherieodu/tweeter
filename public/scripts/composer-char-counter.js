$(document).ready(function() {
  // --- our code goes here ---
  log = $("output");

  $("textarea").on('input', event => {
    const target = event.currentTarget;
    const maxLength = 140;
    const currentLength = target.value.length;

    if (currentLength > maxLength) {
      log.text(maxLength - currentLength);
      log.removeClass("under");
      log.addClass("over");
    } else {
      log.text(currentLength);
      log.removeClass("over");
      log.addClass("under");
    }
  })
});

