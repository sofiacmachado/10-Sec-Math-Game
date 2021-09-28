$(document).ready(function() {
    const slider = document.getElementById('number-limit');
    const sliderDisplay = document.getElementById('number-output');
    sliderDisplay.innerHTML = slider.value;    
    const addition = document.getElementById('#equation-plus');
    const subtraction = document.getElementById('#equation-minus');
    const multiplication = document.getElementById('#equation-times');
    const division = document.getElementById('#equation-divide');
    let currentQuestion;
    let timeLeft = 10;
    let interval;
    let score = 0;
    let higherScore = 0;
    let operator = '+';

    const updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

    slider.oninput = function() {
        sliderDisplay.innerHTML = this.value;
    }


   /* Update Score */

    const updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    }

    /* Update Higher Score */

    const updateHigherScore = function () {
        if (score > higherScore) {
            higherScore = score;
        }
        $('#higher-score').text(higherScore);
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
                    updateHigherScore();
                }
            }, 1000);
        }
    }

    const randomNumberGenerator = function(size) {
        return Math.ceil(Math.random() * size);
    }

    const getOperator = function() {
        if (addition.checked) {
            return operator = '+';
        } else if (subtraction.checked) {
            return operator = '-';
        } else if (multiplication.checked) {
            return operator = '*';
        } else if (division.checked) {
            return operator = '/';
        }
    }

  /*   $(document).on('click', '.equation-type', function () {
        if ('#equation-plus:focus') {
            operator = '+';
        } else if ($('#equation-minus:focus')) {
            operator = '-';
        } else if ($('#equation-times:focus')) {
            operator = '*';
        } else if ($('#equation-divide:focus')) {
            operator = '/';
        }

        return operator;
    }) */

    const questionGenerator = function () {
        let question = {};
        let num1 = randomNumberGenerator(slider.value);
        let num2 = randomNumberGenerator(slider.value);
        


        question.answer = num1 + num2;
        question.equation = String(num1) + operator + String(num2);

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
    console.log(operator);
    console.log('number-limit');
});