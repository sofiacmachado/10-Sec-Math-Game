$(document).ready(function() {
        
    let currentQuestion;
    let timeLeft = 10;
    let interval;
    let score = 0;
 

    const updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

   /* Update Score */

    const updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    }

    /* Set Timer to Start Game */
    const startGame = function () {
        if(!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                updateScore(-score);
            }
            interval = setInterval(function () {
                updateTimeLeft(-1);
                if(timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000);
        }
    }

 

    const randomNumberGenerator = function(size) {
            return Math.ceil(Math.random() * size);
        }

    const questionGenerator = function () {
        let question = {};
        let num1 = randomNumberGenerator(10);
        let num2 = randomNumberGenerator(10);
        
        question.answer = num1 + num2;
        question.equation = String(num1) + ' + ' + String(num2);

        return question;
    }

    const renderNewQuestion = function() { 
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);
    }
    
    /* Compare user input and equation result */
    
    const checkAnswer = function(userInput, answer) {
        if (userInput === answer) {
            renderNewQuestion();
            //reset input
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    }


    
    $('#user-input').on('keyup', function() {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    renderNewQuestion();

});