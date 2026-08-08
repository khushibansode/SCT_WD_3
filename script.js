const questions = [
{
    question: "What does HTML stand for?",
    answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "High Text Machine Language", correct: false },
        { text: "Hyperlinks and Text Markup Language", correct: false },
        { text: "Home Tool Markup Language", correct: false }
    ]
},
{
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
        { text: "<a>", correct: true },
        { text: "<img>", correct: false },
        { text: "<p>", correct: false },
        { text: "<div>", correct: false }
    ]
},
{
    question: "Which CSS property changes text color?",
    answers: [
        { text: "color", correct: true },
        { text: "font-color", correct: false },
        { text: "background-color", correct: false },
        { text: "text-style", correct: false }
    ]
},
{
    question: "Which JavaScript keyword declares a constant?",
    answers: [
        { text: "const", correct: true },
        { text: "var", correct: false },
        { text: "let", correct: false },
        { text: "constant", correct: false }
    ]
},
{
    question: "Which method selects an element by ID?",
    answers: [
        { text: "getElementById()", correct: true },
        { text: "querySelector()", correct: false },
        { text: "getElements()", correct: false },
        { text: "selectElement()", correct: false }
    ]
},
{
    question: "Which company developed JavaScript?",
    answers: [
        { text: "Netscape", correct: true },
        { text: "Google", correct: false },
        { text: "Microsoft", correct: false },
        { text: "Apple", correct: false }
    ]
},
{
    question: "Which CSS property centers text?",
    answers: [
        { text: "text-align", correct: true },
        { text: "font-align", correct: false },
        { text: "justify-content", correct: false },
        { text: "align-text", correct: false }
    ]
},
{
    question: "Which HTML tag displays an image?",
    answers: [
        { text: "<img>", correct: true },
        { text: "<picture>", correct: false },
        { text: "<image>", correct: false },
        { text: "<src>", correct: false }
    ]
},
{
    question: "Which symbol selects an ID in CSS?",
    answers: [
        { text: "#", correct: true },
        { text: ".", correct: false },
        { text: "@", correct: false },
        { text: "*", correct: false }
    ]
},
{
    question: "Which operator checks both value and data type?",
    answers: [
        { text: "===", correct: true },
        { text: "==", correct: false },
        { text: "=", correct: false },
        { text: "!=", correct: false }
    ]
}
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");

const questionCount = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");

const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    questions.sort(() => Math.random() - 0.5);

    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    showQuestion();
}

function showQuestion() {

    resetState();

    const currentQuestion = questions[currentQuestionIndex];

    questionCount.textContent =
        `Question ${currentQuestionIndex + 1} / ${questions.length}`;

    progressBar.style.width =
        ((currentQuestionIndex + 1) / questions.length) * 100 + "%";

    questionElement.textContent = currentQuestion.question;

    const shuffledAnswers = [...currentQuestion.answers]
        .sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.classList.add("btn");

        if (answer.correct) {

            button.dataset.correct = true;

        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });

}
function resetState() {

    nextBtn.style.display = "none";

    while (answerButtons.firstChild) {

        answerButtons.removeChild(answerButtons.firstChild);

    }

}

function selectAnswer(e) {

    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {

        score++;

        selectedBtn.classList.add("correct");

    } else {

        selectedBtn.classList.add("wrong");

    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.classList.add("correct");

        }

        button.disabled = true;

    });

    nextBtn.style.display = "block";

}

nextBtn.addEventListener("click", () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();

    }

});

function showScore() {

    quizScreen.classList.add("hide");

    resultScreen.classList.remove("hide");

    let percentage = Math.round((score / questions.length) * 100);

    scoreElement.innerHTML =
        `You scored ${score} / ${questions.length}<br>${percentage}%`;

    if (percentage === 100) {

        messageElement.textContent = "🏆 Perfect Score!";

    } else if (percentage >= 80) {

        messageElement.textContent = "🌟 Excellent Work!";

    } else if (percentage >= 60) {

        messageElement.textContent = "👍 Good Job!";

    } else if (percentage >= 40) {

        messageElement.textContent = "📚 Keep Practicing!";

    } else {

        messageElement.textContent = "💪 Don't Give Up!";

    }

}

restartBtn.addEventListener("click", () => {

    resultScreen.classList.add("hide");

    startScreen.classList.remove("hide");

});