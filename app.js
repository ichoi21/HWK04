//jQuery code begins with $
$(document).ready(function () {
  var score = 0;
  var questionIndex;
  var secondsLeft = 45;
  var timeInterval;

  //need to add JSON parse to use LocalStorage for Scores

  // create a function to refresh the html on the screen each time the question is changed
  function refreshQ() {}

  // Need to create a timer for quiz
  function countdown() {
    var timer = document.querySelector("#timeclock");
    timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "0:" + secondsLeft + " seconds left!";
      if (secondsLeft < 1) {
        clearInterval(timerInterval);
        sendMessage("Guess You're Not Current");
      }
    }, 1000);
  }

  // Need to use 4/23 class for todo list to prepend recorded scores
  function showHighscores() {}

  // function to start the quiz and to show Scores
  // #btnStart
  // #btnScore

  $(document).on("click", "#btnStart", function () {
    questionIndex = 0;
    refreshQ();
    $("#timeclock").append(
      `<div class="col-sm-12"><p id="timer">45 Seconds GO!</p></div>`
    );
    $("#footer").append(`<div id="alert" class="col-sm-12">`);
    countdown();
  });
  
  // $(document).on("click", "#scoreBtn", function () {
  //   showHighscores();
  // });

  // function during quiz

  //After Quiz is done, need a command to record score
  function recordScore() {}


  // bonus to reset Scores (clear LocalStorage)
