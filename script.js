$(document).ready(function() {
    const slider = document.getElementById('number-limit');
    const sliderDisplay = document.getElementById('number-output');
    sliderDisplay.innerHTML = slider.value;    
    const addition = document.getElementById('equation-plus');
    const subtraction = document.getElementById('equation-minus');
    const multiplication = document.getElementById('equation-times');
    const division = document.getElementById('equation-divide');
    let currentQuestion;
    let timeLeft = 10;
    let interval;
    let score = 0;
    let higherScore = 0;
    let operator;

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
        let operators = [];
        if (addition.checked === true) {
            operators.push('+');
        }
        if (subtraction.checked === true) {
            operators.push('-');
        }
        if (multiplication.checked === true) {
            operators.push('*');
        }
        if (division.checked === true) {
            operators.push('/');
        }
        if (operators.length === 0) {
            operator = '+';
        } else if (operators.length === 1) {
            operator = operators[0];
        } else {
            let i = Math.floor(Math.random() * operators.length);
            operator = operators[i];
        }
        return operator;
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
        
        let smallestNumber;

        while(num1 === num2) {
            num1 = randomNumberGenerator(slider.value);
        }

        if (num1 < num2) {
            smallestNumber = num1;
            num1 = num2;
            num2 =smallestNumber;
        }

        let num3 = num1 * num2;

        getOperator();
        if (operator === '+') {
            question.answer = num1 + num2;
            question.equation = String(num1) + operator + String(num2);
        } else if (operator === '-') {
            question.answer = num1 - num2;
            question.equation = String(num1) + operator + String(num2);
        } else if (operator === '*') {
            question.answer = num1 * num2;
            question.equation = String(num1) + operator + String(num2);
        } else if (operator === '/') {
            question.answer = num3 / num1;
            question.equation = String(num3) + operator + String(num1);
        }
        
        console.log(num1);
        console.log(num2);
        console.log(num3);
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
    
    $('.equationType').onclick = function () {
        getOperator();        
    };

    $('#user-input').on('keyup', function() {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });


    renderNewQuestion();
    
});