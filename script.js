$(document).ready(function() {
        
    let currentQuestion;

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
        }
    }

    $('#user-input').on('keyup', function() {
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    renderNewQuestion();
    
});