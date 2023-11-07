const timeText = document.querySelector(".time");
const timerForm = document.getElementById("timer-form");
const seconds = document.getElementById("seconds");

const playBtn = document.querySelector(".play-button");
const restartBtn = document.querySelector(".restart-button");
const btnIcon = document.getElementById("play-icon");

const timerUpModal = document.getElementById("timerUpModal");
const closeModalBtn = document.getElementById("closeModal");
const restartTimerBtn = document.getElementById("restartTimer");

let hours = document.querySelector(".mins");
let minsAndSecs = document.querySelector(".blue-text");

// TIMER
let initialTime = timeCounter = 0;
// let initialTime = 0;
let stopwatchRunning = false;
let intervalId;

// FUNCTIONS
const calcTime = function (unit, time = timeCounter) {
  if (unit === "hours") return Math.floor(time / 60 / 60);
  if (unit === "minutes") return Math.floor((time % 3600) / 60);
  if (unit === "seconds") return Math.floor(time % 60);
};

const formatTime = (timeNum) => (timeNum + "").padStart(2, "0");

const updateDOMTime = function () {
  hours.textContent = formatTime(calcTime("hours"));
  minsAndSecs.textContent = `${formatTime(calcTime("minutes"))}:${formatTime(
    calcTime("seconds")
  )}`;
};

timerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  initialTime = timeCounter =
    +timerForm.elements.hours.value * 3600 +
    +timerForm.elements.minutes.value * 60 +
    +timerForm.elements.seconds.value;
  updateDOMTime();
});

const startTimer = function () {
  if (!stopwatchRunning) {
    stopwatchRunning = true;
    if(initialTime === timeCounter) timerForm.requestSubmit();
    
    timerForm.classList.add("hidden");
    timeText.classList.remove("hidden");
    
    btnIcon.classList.remove("fa-play");
    btnIcon.classList.add("fa-pause");
    restartBtn.classList.remove("hidden");
    
    intervalId = setInterval(() => {
      if (timeCounter > 0) timeCounter--;
      updateDOMTime();
      if (timeCounter < 1) {
        timerUpModal.style.display = "block";
        clearInterval(intervalId);
        stopwatchRunning = false;
        initialTime = timeCounter

        btnIcon.classList.remove("fa-pause");
        btnIcon.classList.add("fa-play");
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
    stopwatchRunning = false;

    btnIcon.classList.remove("fa-pause");
    btnIcon.classList.add("fa-play");
  }
};

const restartTimer = function () {
  clearInterval(intervalId);
  timeCounter = 0;
  stopwatchRunning = false;

  timeText.classList.add("hidden");
  timerForm.classList.remove("hidden");
  seconds.focus();
  timerForm.reset();

  btnIcon.classList.remove("fa-pause");
  btnIcon.classList.add("fa-play");

  hours.textContent = "00";
  minsAndSecs.textContent = `00:00`;

  restartBtn.classList.add("hidden");
};

// EVENTS
playBtn.addEventListener("click", startTimer);
restartBtn.addEventListener("click", restartTimer);

// Focuses the form text cursor when reloading
seconds.focus();
document.addEventListener("DOMContentLoaded", () => seconds.focus());
