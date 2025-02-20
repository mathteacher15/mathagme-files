let currentMode = '';
let correctAnswers = 0;
let incorrectAnswers = 0;
let longestStreak = 0;
let currentStreak = 0; // Track the current streak of correct answers
let timer;
let timeLeft = 60;  // For timed mode

// Start the game
document.getElementById('start-timed').onclick = () => startGame('timed');
document.getElementById('start-infinite').onclick = () => startGame('infinite');

// Start the game with a chosen mode
function startGame(mode) {
    currentMode = mode;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    correctAnswers = 0;
    incorrectAnswers = 0;
    longestStreak = 0;
    currentStreak = 0; // Reset streak for the new game
    updateStats(); // Update stats display
    generateQuestion();

    if (mode === 'timed') {
        startTimer();
    }
}

// Generate a random multiplication question
function generateQuestion() {
    let num1 = Math.floor(Math.random() * 15) + 1;
    let num2 = Math.floor(Math.random() * 15) + 1;
    document.getElementById('question').textContent = `${num1} x ${num2}`;
    document.getElementById('answer').value = '';  // Clear previous answer
    document.getElementById('answer').focus();  // Focus the input field
    document.getElementById('submit-answer').onclick = () => checkAnswer(num1, num2);
    document.getElementById('answer').onkeydown = (e) => {
        if (e.key === 'Enter') {
            checkAnswer(num1, num2);
        }
    };
}

// Check if the answer is correct
function checkAnswer(num1, num2) {
    let userAnswer = parseInt(document.getElementById('answer').value);
    let correctAnswer = num1 * num2;

    if (userAnswer === correctAnswer) {
        correctAnswers++;
        currentStreak++; // Increment the current streak
        longestStreak = Math.max(longestStreak, currentStreak); // Update longest streak if needed

        // Show "Correct!" message
        showCorrectMessage();
    } else {
        incorrectAnswers++;
        currentStreak = 0; // Reset streak on incorrect answer
    }

    updateStats(); // Update the stats on each answer
    generateQuestion();
}

// Function to show the "Correct!" message
function showCorrectMessage() {
    const message = document.createElement('div');
    message.classList.add('correct-message');
    message.textContent = 'Correct!';

    // Append the message to the body (or game screen)
    document.body.appendChild(message);

    // Remove the message after the animation ends (1 second)
    setTimeout(() => {
        message.remove();
    }, 1000);
}

// Update the stats display
function updateStats() {
    document.getElementById('correct-count').textContent = correctAnswers;
    document.getElementById('incorrect-count').textContent = incorrectAnswers;
    document.getElementById('longest-streak').textContent = longestStreak;
}

// Timer for timed mode
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('total-correct').textContent = `Total Correct Answers: ${correctAnswers}`;
    document.getElementById('total-incorrect').textContent = `Total Incorrect Answers: ${incorrectAnswers}`;
    document.getElementById('longest-streak-final').textContent = `Longest Correct Streak: ${longestStreak}`;
}

// Restart the game
document.getElementById('restart-game').onclick = () => {
    correctAnswers = 0;
    incorrectAnswers = 0;
    longestStreak = 0;
    currentStreak = 0;
    timeLeft = 60;  // Reset timer
    updateStats();  // Clear the stats display
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
};
