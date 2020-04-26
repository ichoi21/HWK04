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
  // #btnStart & #btnScore
  $(document).on("click", "#btnStart", function () {
    questionIndex = 0;
    refreshQ();
    $("#timeclock").append(
      `<div class="col-sm-12"><p id="timer">45 Seconds GO!</p></div>`
    );
    $("#footer").append(`<div id="alert" class="col-md-12">`);
    countdown();
  });
  // console.log(timeclock)
  // $(document).on("click", "#scoreBtn", function () {
  //   showHighscores();
  // });

  // function during quiz after each question - show/hide alert
  // #btnAnswer
  $(document).on("click", "#btnAnswer", function () {
    if ($(this).text() === Answers[questionIndex]) {
      score += 20;
      showAlert("NICE!", "success text-center");
    } else {
      showAlert("NOPE! -5 seconds", "danger");
      secondsLeft -= 5;
    }
  
    if (questionIndex < Questions.length - 1) {
        questionIndex++;
      refreshQ();
      } else {
      sendMessage("");
      clearInterval(timerInterval);
    }
  });

  //After Quiz is done, need a command to record score
  function recordScore() {}

  // bonus to reset Scores (clear LocalStorage)