var score = 0;
var questionIndex;

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

// function to start the quiz and to show Scores
// #btnStart & #btnScore
$(document).on("click", "#btnStart", function () {
  questionIndex = 0;
  refreshQ();
});

// function during quiz after each question - show/hide alert
// #btnAnswer
$(document).on("click", "#btnAnswer", function () {
  if ($(this).text() === Answers[questionIndex]) {
    score += 12.5;
    //NEED to ADD COUNTER HERE!!!
  }

  if (questionIndex < Questions.length - 1) {
    questionIndex++;
    refreshQ();
  } else {
    sendMessage("");
  }
});

function sendMessage(str) {
  $("#body").attr("class", "col-md-12 text-center");
  $("#body").html(
    `<h2>You scored a ${score}%!</h2>
      <br />
      <h4>Please enter your city name below</h4>
      <br />
      <form>
        <input
          type="text"
          name="alias"
          id="cityName"
          autofocus placeholder="Enter City Name"/>
        <button id="btnSubmit" class="btn btn-outline-primary">City Name</button>
      </form>`
  );
}

$(document).on("click", "#btnSubmit", function (e) {
  e.preventDefault();
  var cityName = $("#cityName").val();

  console.log(cityName);
  console.log(score);
});
