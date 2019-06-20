let triviaQuiz = [{
    question: 'Only in Houston does "Rice" refers to ____',
    choice: ['A person', 'A grain', 'A university'],
    answer: 2,
    correctCaption: "That's right! Rice University!",
    wrongCaption: "Em...Not a local college kid for sure"
}, {
    question: "Whether it’s Cajun, Tex-Mex, Greek, BBQ, steak, seafood, or burgers, the _____ family restaurants have you covered.",
    choice: ["Pappas", "Mammas", "Brothers"],
    answer: 0,
    correctCaption: "Pappas! Yummy!",
    wrongCaption: "Mammas and Brothers? Seriously?"
}, {
    question: "Houston locals plan road trips just so they can work in a _____ stop.",
    choice: ["Von's", "Wendy's", "Buc-ee's"],
    answer: 1,
    correctCaption: "Wendy's everywhere!",
    wrongCaption: "Em...defnitely a McDonald's person, this one"
}, {
    question: 'When someone mentions they’re going to “the beach," you know they’re talking about _____.',
    choice: ["Galveston", "Hunters Creek", "Buffalo Bayou"],
    answer: 0,
    correctCaption: "Galveston beach! Where people fish crabs!!",
    wrongCaption: "Dude...you never drive 1 hour down south along I45? Geez...."
}, {
    question: "We bet you can't drive past the intersection of 610 and Kirby and NOT think about _____.",
    choice: ["Buffalo Bayou Park", "Astroworld", "Toyota Stadium"],
    answer: 0,
    correctCaption: "You are definitely an uptown folk!",
    wrongCaption: "Houston is not just about Astro and Rockets! Think Again!"
}, {
    question: "Only in Houston do they call service roads _____.",
    choice: ["Frontage Roads", "Feeder Roads", "First Roads"],
    answer: 0,
    correctCaption: "Your way or High way!",
    wrongCaption: "Really? Can you even drive?"
}, {
    question: "For vintage clothing and retro decor, _____ in The Heights is the place to go.",
    choice: ["Rodeo Drive", "5th Ave", "19th Street"],
    answer: 2,
    correctCaption: "Old style is Texas style!",
    wrongCaption: "This is Houston ok? Not NYC..."
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
    quizTimer = setInterval(function () {
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
    for (i = 0; i < triviaQuiz[currQuizIdx].choice.length; i++) {
        currChoice += '<div container="row"><a class="btn btn-primary btn-lg" id="' + i + '">' + triviaQuiz[currQuizIdx].choice[i] + "</a></div>"
    }

    // show choices
    $("#selectZone").html(currChoice);
    $("#selectZone>*").each(function () {
        $(this).css({
            "margin-top": "20px"
        })
        console.log($(this).find("a"));
        $(this).find("a").css({
            "font-size": "40px"
        });

        $(this).find("a").on("click", function () {
            clearInterval(quizTimer);

            let answerId = $(this).attr("id");
            answerId = parseInt(answerId);

            // show answer
            $("#answerZone").show();
            if (triviaQuiz[currQuizIdx].answer === answerId) {
                // correct answer
                console.log("correct answer");
                $("#selectZone").html('<img src="assets/images/yay.gif" alt="yay" width="60%">');
                $("#answerZone").text(triviaQuiz[currQuizIdx].correctCaption);
                correctAnswer += 1;
            } else {
                // Wrong answer
                console.log("wrong answer");
                $("#selectZone").html('<img src="assets/images/nay.gif" alt="yay" width="60%">');
                $("#answerZone").text(triviaQuiz[currQuizIdx].wrongCaption);
            }

            // next quiz
            nextQuiz();
        })
    });
}

function nextQuiz() {
    currQuizIdx += 1;       // next quiz

    // wait for five second and update quiz
    let chillDownTime = new Date().getTime() + answerTimeMS;
    answerTimer = setInterval(function () {
        let now = new Date().getTime();
        let distance = chillDownTime - now;
        if (distance < 0) {
            clearInterval(answerTimer);
            if (currQuizIdx >= triviaQuiz.length) {
                // end of quiz, show score
                $("#timer").text("You are done!");
                $("#questionZone").text("Your Score: ");
                $("#selectZone").html('<div container="row">Correct Answer: ' + correctAnswer + '</div>');
                $("#selectZone").append('<div container="row">Wrong Answer: ' + (triviaQuiz.length - correctAnswer) + '</div>')
                $("#selectZone").addClass("score");
                $("#answerZone").hide();
            } else {
                updateQuiz();
                updateQuizTimer();
            }
        }
    }, 1000);
}

$(function () {
    // add css styling
    $('#triviaGameZone').addClass('triviaZone');
    $('h1').addClass('center');
    $("#start").addClass("startButton");
    $("#questionZone").addClass("questionText");
    $("#timer").css({
        "font-size": "25px"
    })
    $("#answerZone").css({
        "font-size": "20px",
        "margin-top": "20px"
    })

    // TODO: shuffle the sequence of the quiz questions

    // on click the start button, quiz starts!
    $("#start").on("click", function (e) {
        console.log('start');
        updateQuiz()
        updateQuizTimer();
    })
});