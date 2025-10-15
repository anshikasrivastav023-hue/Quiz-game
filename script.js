const questions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Tabular Markup Language", correct: false },
      { text: "None of these", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "/* */", correct: false },
      { text: "#", correct: false },
      { text: "<!-- -->", correct: false }
    ]
  },
  {
    question: "CSS stands for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style System", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Syntax", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  restartButton.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  answerButtons.innerHTML = "";
}

function selectAnswer(button, correct) {
  const allButtons = answerButtons.querySelectorAll(".btn");
  allButtons.forEach(btn => (btn.disabled = true));

  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

restartButton.addEventListener("click", startQuiz);

function showScore() {
  resetState();
  questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}!`;
  restartButton.classList.remove("hidden");
  nextButton.classList.add("hidden");
}

startQuiz();