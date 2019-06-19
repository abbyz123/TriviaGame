let triviaQuiz = [{
    question: 'who is your daddy?',
    choice: ['you are', 'he is', 'no one is'],
    answer: 1
}];

let currQuizIdx = 0;
let thinkTimeMS = 30000;
let answerTimeMS = 5000;

var quizTimer;
var answerTimer;

function updateQuiz() {
    // show question
    $("#questionZone").append("<p id='currQuestion'>" + triviaQuiz[currQuizIdx].question + "</p>");

    currChoice = "";
    for(i = 0; i < triviaQuiz[currQuizIdx].choice.length; i++) {
        currChoice += "<div container='row'><a class='btn btn-primary btn-lg id='" + i + "'>" + triviaQuiz[currQuizIdx].choice[i] + "</a></div>"
    }

    // show choices
    $("#selectZone").html(currChoice);
    $("#selectZone>*").each(function () {
        $(this).css({
            "margin-top" : "20px"
        })
        console.log($(this).find("a"));
        $(this).find("a").css({
            "font-size" : "20px"
        })
    });

    // remove previous answer
    $("#answerZone").remove();
}

$(function () {
    // add css styling
    $('#triviaGameZone').addClass('triviaZone');
    $('h1').addClass('center');
    $("#start").addClass("startButton");
    $("#questionZone").addClass("questionText");
    $("#timer").css({
        "font-size" : "25px"
    })

    // TODO: shuffle the sequence of the quiz questions

    // on click the start button, quiz starts!
    $("#start").on("click", function (e) {
        console.log('start');
        updateQuiz()

        $("#timer").text("Time left: " + Math.ceil(thinkTimeMS / 1000) + " seconds");
        let countDownTime = new Date().getTime() + thinkTimeMS;
        quizTimer = setInterval(function() {
            let now = new Date().getTime();
            let distance = countDownTime - now;

            if (distance >= 0) {
                let seconds = Math.ceil(distance / 1000);
                $("#timer").text("Time left: " + seconds + " seconds");
            } else {
                clearInterval(quizTimer);
                $("#timer").text("Time is up!");
            }
        }, 1000);
    })
});