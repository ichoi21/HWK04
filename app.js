//jQuery code begins with $
var secondsLeft = 70;
var timerInterval;
var score = 0;
var questionIndex;

//need to add JSON parse to use LocalStorage for Scores
try {
  var rankArray = JSON.parse(window.localStorage.getItem("QuizScore"));
} catch {
  var rankArray = [{}];
}
var rankLength;

//sorts out Questions Array from question and choices.
function refreshQ() {
  $("#header").html("");
  $("#body").html("");
  for (var i = 0; i < Object.keys(Questions[questionIndex]).length; i++) {
    if (i === 0) {
      $("#header").prepend(`
        <h5 data-id=${i}>
          ${Questions[questionIndex][i]}
        </h5>`);
    } else {
      $("#body").attr("class", "col-md-12 text-center");
      $("#body").append(`
        <h5 id="btnAnswer" class="btn btn-outline-primary w-50">${Questions[questionIndex][i]}</h5><br>
      `);
    }
  }
}

// timer for quiz (counter subtracting)
function countdown() {
  var timer = document.querySelector("#timeclock");
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "You have " + secondsLeft + " seconds left!";
    if (secondsLeft < 1) {
      clearInterval(timerInterval);
      sendMessage("Guess You're Not Current");
    }
  }, 1000);
}

//After Quiz is done, need a command to record score and generate score list
function showScores() {
  $("#timeclock").html("");
  $("#header").html("");
  $("#body").attr("class", "col-md-12 text-center");
  $("#body").html(`
    <table id="scoreTable" class="table table-striped table-dark table-hover">
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
    <button id="reset" class="btn btn-outline-danger m-2">Reset</button>
    `);

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
$(document).on("click", "#btnScore", function () {
  showScores();
});

// function during quiz after each question - show/hide alert
// #btnAnswer
$(document).on("click", "#btnAnswer", function () {
  if ($(this).text() === Answers[questionIndex]) {
    score += 12.5;
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

function sendMessage(str) {
  $("#timeclock").html("You finished with " + secondsLeft + " seconds left!");
  $("#header").html("");
  $("#body").attr("class", "col-md-12 text-center");
  $("#body").html(
    `<h2>You scored a ${score}%!</h2>
      <br />
      <form>
        <input
          type="text"
          name="alias"
          id="alias"
          autofocus placeholder="Enter an Alias"/>
        <button id="btnSubmit" class="btn btn-outline-primary">Save</button>
      </form>
      <br />
      <form><button id="btnScore" class="btn btn-outline-success">Don't Record</button>
      <button type="submit" class="btn btn-outline-danger">Try Again</button></form>`
  );
}

function showAlert(str, type) {
  $("#alert").show();
  $("#alert").attr("class", `alert alert-${type}`);
  $("#alert").text(str);
  window.setTimeout(function () {
    $("#alert").hide();
  }, 3000);
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

// #reset clears localStorage
$(document).on("click", "#reset", function () {
  window.localStorage.clear();
  $("").html("");
});
