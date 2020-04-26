//jQuery code begins with $
var score = 0;
var questionIndex;
var secondsLeft = 45;
var timeInterval;

//need to add JSON parse to use LocalStorage for Scores

// create a function to refresh the html on the screen each time the question is changed
function refreshQ() {
  $("#header").html("");
  $("#body").html("");
  // prepend each item in the object to the screen
  for (var i = 0; i < Object.keys(Questions[questionIndex]).length; i++) {
    if (i === 0) {
      $("#header").append(`
        <h5 data-id=${i}>
          ${Questions[questionIndex][i]}
        </h5>`);
    } else {
      $("#body").attr("class", "col-md-12 text-center");
      $("#body").append(`
        <h5 id="btnAnswer">${Questions[questionIndex][i]}</h5><br>
      `);
    }
  }
}

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
$(document).on("click", "#scoreBtn", function () {
  showScores();
});

// function during quiz after each question - show/hide alert
// #btnAnswer
$(document).on("click", "#btnAnswer", function () {
  if ($(this).text() === Answers[questionIndex]) {
    score += 20;
    showAlert("NICE!", "success text-center");
  } else {
    showAlert("NOPE!", "danger");
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
function showScores() {
  $("#header").html(`<div id="header" class="col-md-12 text-center"></div>`);
  $("#body").attr("class", "col-md-12 text-left");
  $("#body").html(`
    <table id="scoreTable" class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Alias</th>
          <th scope="col">Points</th>
        </tr>
      </thead>
      <tbody id="tbody"></tbody>
    </table>
    
    <a href="./index.html" class="btn btn-outline-success m-2">
      Return
    </a>
    <button id="reset" class="btn btn-outline-danger m-2">Reset</button>`);
  clearInterval(timerInterval);
  rankArray.sort(function (a, b) {
    return b.score - a.score;
  });

  if (rankArray.length < 10) {
    rankLength = rankArray.length;
  } else {
    rankLength = 10;
  }

  for (var i = 0; i < rankLength; i++) {
    var currentRank = i + 1;
    $("#tbody").append(`<tr id="row-${i}"></tr>`);
    $(`#row-${i}`).append(`<td>${currentRank}</td>`);
    $(`#row-${i}`).append(`<td>${rankArray[i].name}</td>`);
    $(`#row-${i}`).append(`<td>${rankArray[i].score}</td>`);
  }
}

function showAlert(str, type) {
  $("#alert").show();
  $("#alert").attr("class", `alert alert-${type}`);
  $("#alert").text(str);
  window.setTimeout(function () {
    $("#alert").hide();
  }, 1000);
}

$(document).on("click", "#btnSubmit", function (e) {
  e.preventDefault();
  name = $("#alias").val();
  if (name === "") {
    showAlert("You forgot to type an alias", "danger");
  } else {
    if (rankArray === null) {
      rankArray = [];
    }
    rankArray.push({ name, score });
    window.localStorage.setItem("QuizScore", JSON.stringify(rankArray));
    showScores();
  }
});

// bonus to reset Scores (clear LocalStorage) #reset
$(document).on("click", "#reset", function () {
  window.localStorage.clear();
  $("").html("");
});
