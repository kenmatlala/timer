let timerDisplay = document.getElementById("timer");
let timesUpMessage = document.getElementById("times-up");

let totalSeconds = 0;
let countdown = null;
let running = false;

function updateDisplay() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  timerDisplay.textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function startPauseTimer() {
  if (!running && totalSeconds > 0) {
    running = true;
    countdown = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
      } else {
        clearInterval(countdown);
        running = false;
        // Fade out numbers, show TIME'S UP, flash background
        timerDisplay.style.opacity = "0";
        timesUpMessage.style.display = "block";
        document.body.classList.add("flash-bg");
      }
    }, 1000);
  } else {
    running = false;
    clearInterval(countdown);
  }
}

function resetTimer() {
  totalSeconds = 0;
  updateDisplay();
  timesUpMessage.style.display = "none";
  timerDisplay.style.opacity = "1";
  document.body.classList.remove("flash-bg");
}

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    totalSeconds += 60;
    updateDisplay();
  }
  if (e.code === "ArrowDown") {
    if (totalSeconds >= 60) totalSeconds -= 60;
    updateDisplay();
  }
  if (e.code === "Space") {
    e.preventDefault(); // prevent scroll
    startPauseTimer();
  }
  if (e.code === "Delete") {
    resetTimer();
  }
});

updateDisplay();
