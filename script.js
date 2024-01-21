let questions = [
    {
        question: "Wer hat HTML erfunden",
        answer_1: "Robbie Williams",
        answer_2: "Lady Gaga",
        answer_3: "Tim Berners-Lee",
        answer_4: "Michael Jackson",
        right_answer: 3,
    },

    {
        question: "Wer ist der Schöpfer von JavaScript",
        answer_1: "Bill Gates",
        answer_2: "Elon Musk",
        answer_3: "Brendan Eich",
        answer_4: "Mark Zuckerberg",
        right_answer: 3,
    },

    {
        question: "Welche Sprache hat Guido van Rossum entwickelt?",
        answer_1: "Java",
        answer_2: "Python",
        answer_3: "C++",
        answer_4: "Ruby",
        right_answer: 2,
    },

    {
        question: "Wie wird eine Funktion in JavaScript definiert",
        answer_1: "func",
        answer_2: "method",
        answer_3: "def",
        answer_4: "function",
        right_answer: 4,
    },

    {
        question: "Was ist die Rolle der 'console.log()' Funktion in JavaScript?",
        answer_1: "Sie gibt Informationen in der Konsole aus.",
        answer_2: "Sie startet eine Schleife im Code.",
        answer_3: "Sie zeigt eine Benachrichtigung an den Benutzer.",
        answer_4: "Sie öffnet die Entwicklertools im Browser.",
        right_answer: 1,
    },
];

let rightQuestion = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio("audio/success.mp3");
let AUDIO_FAIL = new Audio("audio/fail.mp3");

function init() {
    document.getElementById("all-questions").innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else { // show question
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById("endScreen").style = "";
    document.getElementById("questionBody").style = "display: none";

    document.getElementById("question-amount").innerHTML = questions.length;
    document.getElementById("right-question-amount").innerHTML = rightQuestion;
    document.getElementById("header-image").src = "img/win.png";
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = (percent * 100);
    document.getElementById("progress-bar").innerHTML = `${percent} %`;
    document.getElementById("progress-bar").style = `width: ${percent}%;`;
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("questionText").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionsNumber = selection.slice(-1);
    let rightAnswer = `answer_${question["right_answer"]}`;

    if (rightAnswerSelected(selectedQuestionsNumber)) {
        document.getElementById(selection).parentNode.classList.add("bg-success");
        AUDIO_SUCCESS.play();
        rightQuestion++;
    } else {
        document.getElementById(selection).parentNode.classList.add("bg-danger");
        document.getElementById(rightAnswer).parentNode.classList.add("bg-success");
        AUDIO_FAIL.play();
    }
    document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedQuestionsNumber) {
    return selectedQuestionsNumber == questions["right_answer"];
}

function nextQuestion() {
    currentQuestion++; // erhöht von 0 auf 1
    document.getElementById("next-button").disabled = true;
    resetAnswerButton();
    showQuestion();
}

function resetAnswerButton() {
    document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_1").parentNode.classList.remove("bg-success");
    document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_2").parentNode.classList.remove("bg-success");
    document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_3").parentNode.classList.remove("bg-success");
    document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
    document.getElementById("header-image").src = "img/quiz.jpg";
    document.getElementById("questionBody").style = ""; // questionBody wieder anzeigen
    document.getElementById("endScreen").style = "display: none"; // Endscreen ausblenden

    rightQuestion = 0;
    currentQuestion = 0;
    init();
}



