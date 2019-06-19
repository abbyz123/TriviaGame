let triviaQuiz = [{question : 'who is your daddy?',
                   choice   : ['you are', 'he is', 'no one is'],
                   answer   : 1}];

let currQuizIdx = 0;

$(function () {
    // add css styling
    $('#triviaGameZone').addClass('triviaZone');
    $('h1').addClass('center');
    $("#start").addClass("startButton");
    $("#questionZone").addClass("questionText");

    // TODO: shuffle the sequence of the quiz questions

    // on click the start button, quiz starts!
    $("#start").on("click", function(e) {
        console.log('start');
        // show question
        $("#questionZone").text(triviaQuiz[currQuizIdx].question);
    })
});