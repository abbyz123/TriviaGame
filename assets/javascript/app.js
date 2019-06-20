let triviaQuiz = [{
    question: 'who is your daddy?',
    choice: ['you are', 'he is', 'no one is'],
    answer: 1
}, {
    question: "who is your mummy?",
    choice: ["you are", "she is", "no one is"],
    answer: 0
}, {
    question: "who is your granpa?",
    choice: ["you are", "he is", "no one is"],
    answer: 2
}, {
    question: "who is your granma?",
    choice: ["you are", "she is", "no one is"],
    answer: 1
}];

let currQuizIdx = 0;
let thinkTimeMS = 30000;
let answerTimeMS = 5000;

var quizTimer;
var answerTimer;

let correctAnswer = 0;

function updateQuizTimer() {
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

            // move on to next quiz
            nextQuiz();
        }
    }, 1000);
}

function updateQuiz() {
    // remove previous answer
    $("#answerZone").hide();

    // show question
    $("#questionZone").html("<p id='currQuestion'>" + triviaQuiz[currQuizIdx].question + "</p>");

    currChoice = "";
    for(i = 0; i < triviaQuiz[currQuizIdx].choice.length; i++) {
        currChoice += '<div container="row"><a class="btn btn-primary btn-lg" id="' + i + '">' + triviaQuiz[currQuizIdx].choice[i] + "</a></div>"
    }

    // show choices
    $("#selectZone").html(currChoice);
    $("#selectZone>*").each(function () {
        $(this).css({
            "margin-top" : "20px"
        })
        console.log($(this).find("a"));
        $(this).find("a").css({
            "font-size" : "40px"
        });

        $(this).find("a").on("click", function() {
            clearInterval(quizTimer);

            let answerId = $(this).attr("id");
            answerId = parseInt(answerId);

            // show answer
            $("#answerZone").show();
            if (triviaQuiz[currQuizIdx].answer === answerId) {
                // correct answer
                console.log("correct answer");
                $("#answerZone").text("Correct Answer!");
                correctAnswer += 1;
            } else {
                // Wrong answer
                console.log("wrong answer");
                $("#answerZone").text("Wrong Answer!");
            }

            // next quiz
            nextQuiz();           
        })
    });
}

function nextQuiz() {
    currQuizIdx += 1;       // next quiz
    if (currQuizIdx >= triviaQuiz.length) {
        // end of quiz, show score
    } else {
        // down five seconds and move on to next quiz
        let chillDownTime = new Date().getTime() + answerTimeMS;
        answerTimer = setInterval(function() {
            let now = new Date().getTime();
            let distance = chillDownTime - now;
            if (distance < 0) {
                clearInterval(answerTimer);
                updateQuiz();
                updateQuizTimer();
            }
        }, 1000);
    }
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
    $("#answerZone").css({
        "font-size" : "20px",
        "margin-top" : "20px"
    })

    // TODO: shuffle the sequence of the quiz questions

    // on click the start button, quiz starts!
    $("#start").on("click", function (e) {
        console.log('start');
        updateQuiz()
        updateQuizTimer();
    })
});