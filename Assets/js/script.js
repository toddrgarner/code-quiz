// Query Selectors of the HTML
var startButton = document.querySelector("#start");
var backButton = document.querySelector(".back");
var saveButton = document.querySelector("#save");
var resetButton = document.querySelector(".reset");
var showQuiz = document.querySelector("#quiz");
var questionH = document.querySelector("#question");
var answerList = document.querySelector("#answer-list");
var choice1 = document.querySelector("#one");
var choice2 = document.querySelector("#two");
var choice3 = document.querySelector("#three");
var choice4 = document.querySelector("#four");
var timeLeft = document.querySelector("#time-left");
var initialsInput = document.querySelector("#initials");
var hideBegin = document.querySelector(".begin");
var highScoreButton = document.querySelector(".score");
var hideHs = document.querySelector("#high-score-display");
var hsList = document.querySelector("#hs-list");
var addHs = document.querySelector("#high-score-input");
var rightWrong = document.querySelector("#right")

// Global Variables
var timer;
var timerCount;
var initialsStore = []
var scoreStore = []
// Arrays
var questionList = [{
    question: "Commonly used data types DO NOT include?",
    choice1: "Strings",
    choice2: "Booleans",
    choice3: "Alerts",
    choice4: "Numbers",
    rightAnswer: "Alerts"
},
{
    question: "Arrays in javascript can be used to store what?",
    choice1: "Numbers and strings",
    choice2: "Other arrays",
    choice3: "Booleans",
    choice4: "All of the above",
    rightAnswer: "All of the above"
},
{
    question: "A very useful tool used during development and debugging for printing content to debugger is?",
    choice1: "Javascript",
    choice2: "Terminal/bash",
    choice3: "For loops",
    choice4: "Console log",
    rightAnswer: "Console log"
},
{
    question: "String values must be enclosed within ____ when being assigned to variables",
    choice1: "Commas",
    choice2: "Curley brackets",
    choice3: "Quotes",
    choice4: "Perenthises",
    rightAnswer: "Quotes"
}
]

var lastQuestion = questionList.length - 1;
var currentQuestion = 0;

// Funtions
function startQuiz() {
    lastQuestion = questionList.length - 1
    currentQuestion = 0;
    timerCount = 75;
    timeLeft.textContent = timerCount
    initialsInput.value = "";
    hideBegin.setAttribute("style", "display: none");
    startButton.setAttribute("style", "display: none")
    startTimer();
    questionDisplay();
}

function questionDisplay() {
    showQuiz.setAttribute("style", "display: block")
    var questions = questionList[currentQuestion];
    questionH.textContent = questions.question;
    choice1.textContent = questions.choice1;
    choice2.textContent = questions.choice2;
    choice3.textContent = questions.choice3;
    choice4.textContent = questions.choice4;
}

function checkAnswer(event) {
    if (event.target.matches("button"))
        if (event.target.textContent == questionList[currentQuestion].rightAnswer) {
            rightWrong.setAttribute("style", "color: green")
            rightWrong.textContent = "Right!"
            nextQuestion();
        }
        else {
            timerCount = timerCount - 15;
            rightWrong.setAttribute("style", "color: red");
            rightWrong.textContent = "Wrong!";
        }
}

function nextQuestion() {
    if (currentQuestion < lastQuestion && timerCount > 0) {
        currentQuestion++;
        questionDisplay();
    } else {
        endgame();
    }
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timeLeft.textContent = timerCount
        if (timerCount <= 0) {
            clearInterval(timer);
            endgame();
        }
    }, 1000)
}

function endgame() {
    clearInterval(timer);
    timeLeft.textContent = timerCount
    rightWrong.textContent = ""
    hideBegin.setAttribute("style", "display: none");
    showQuiz.setAttribute("style", "display: none");
    hideHs.setAttribute("style", "display: none")
    addHs.setAttribute("style", "display: contents")
}

function highScoreDisp() {
    clearInterval(timer);
    timeLeft.textContent = 0;
    hideBegin.setAttribute("style", "display: none")
    showQuiz.setAttribute("style", "display: none");
    hideHs.setAttribute("style", "display: contents");
    addHs.setAttribute("style", "display: none")
    saveScore();
}

function highScoreStore() {
    localStorage.setItem("initials", JSON.stringify(initialsStore));
    localStorage.setItem("timeScore", JSON.stringify(scoreStore));
}

function localDisplay() {
    console.log("You made it");
    var initials = JSON.parse(localStorage.getItem("initials"));
    var score = JSON.parse(localStorage.getItem("timeScore"));
    console.log(initials, score);
    if (initials !== null || score !== null) {
        return { initials, score }
    }
}

function saveScore() {
    var arrays = localDisplay();
    console.log(arrays);
    hsList.innerHTML = "";
    for (var i = 0; i < arrays?.initials.length; i++) {
        var initials = arrays?.initials[i]
        var score = arrays?.score[i];
        var ul = hsList
        var li = document.createElement("li");
        li.textContent = initials + " " + score;
        li.setAttribute("data-index", i);
        ul.appendChild(li);
        console.log("looped")
    }
}

function backStart(event) {
    event.stopPropagation();
    hideHs.setAttribute("style", "display: none");
    showQuiz.setAttribute("style", "display: none");
    hideBegin.setAttribute("style", "display: flex");
}

function resetHs() {
    hsList.innerHTML = "";
    initialsStore = [];
    scoreStore = [];
    localStorage.clear();
}



// Event Listeners
startButton.addEventListener("click", startQuiz);
highScoreButton.addEventListener("click", highScoreDisp);
backButton.addEventListener("click", backStart);
answerList.addEventListener("click", checkAnswer);
resetButton.addEventListener("click", resetHs);
saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();

    var initials = initialsInput.value.trim();
    if (initials === "") {
        alert("Please add initials.")
    } else {
        initialsStore.push(initials);
        scoreStore.push(timerCount);
        console.log(initialsStore.length)
        highScoreStore();
        highScoreDisp();
    }
});