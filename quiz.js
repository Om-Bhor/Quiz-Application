const URL = "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple";

const questionText = document.querySelector(".question h1");
const optionButtons = document.querySelectorAll(".answer");
const nextBtn = document.getElementById("next");

let quizData = [];
let currentIndex = 0;
let score = 0;

 
async function loadQuiz() {
    let response = await fetch(URL);
    let data = await response.json();
    quizData = data.results;
    showQuestion();
}

loadQuiz();

 
function showQuestion() {
    let q = quizData[currentIndex];

    questionText.innerHTML = q.question;

    // Create choices array
    let choices = [...q.incorrect_answers, q.correct_answer];

    // Shuffle choices
    choices.sort(() => Math.random() - 0.5);

    // Reset buttons & apply new values
    optionButtons.forEach((btn, i) => {
        btn.innerHTML = choices[i];
        btn.style.backgroundColor = "";
        btn.disabled = false;
    });
}

 
optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let correctAnswer = quizData[currentIndex].correct_answer;
        let userAnswer = btn.innerHTML;

        // Disable all options after selecting
        optionButtons.forEach(b => b.disabled = true);

        // Check answer
        if (userAnswer === correctAnswer) {
            btn.style.backgroundColor = "green";
            score++;
        } else {
            btn.style.backgroundColor = "red";
        }

        // Highlight correct answer
        optionButtons.forEach(b => {
            if (b.innerHTML === correctAnswer) {
                b.style.backgroundColor = "green";
            }
        });
    });
});


nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
});


function showScore() {
    document.querySelector(".quiz").innerHTML = `
        <h1>Quiz Completed!</h1>
        <h2>Your Score: ${score} / ${quizData.length}</h2>
    `;
}

