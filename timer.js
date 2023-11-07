const timeText = document.querySelector(".time");
const timerForm = document.getElementById("timer-form");
const seconds = document.getElementById("seconds");

const playBtn = document.querySelector(".play-button");
const restartBtn = document.querySelector(".restart-button");
const btnIcon = document.getElementById("play-icon");

let hours = document.querySelector(".mins");
let minsAndSecs = document.querySelector(".blue-text");

// TIMER
let timeCounter = 0;
let stopwatchRunning = false;
let intervalId;

// FUNCTIONS
const calcTime = function (unit, time = timeCounter) {
  if (unit === "hours") return Math.floor(time / 60 / 60);
  if (unit === "minutes") return Math.floor(time % 3600 / 60);
  if (unit === "seconds") return Math.floor(time % 60);
};

const formatTime = (timeNum) => (timeNum + "").padStart(2, "0");

timerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  timeCounter =
    +timerForm.elements.hours.value * 3600 +
    +timerForm.elements.minutes.value * 60 +
    +timerForm.elements.seconds.value;
});

const updateDOMTime = function () {
  hours.textContent = formatTime(calcTime("hours"));
  minsAndSecs.textContent = `${formatTime(calcTime("minutes"))}:${formatTime(
    calcTime("seconds")
  )}`;
};

const startTimer = function () {
  if (!stopwatchRunning) {
    timerForm.requestSubmit();
    updateDOMTime()
    timerForm.classList.add("hidden");
    timeText.classList.remove("hidden");

    btnIcon.classList.remove("fa-play");
    btnIcon.classList.add("fa-pause");
    restartBtn.classList.remove("hidden");

    stopwatchRunning = true;

    intervalId = setInterval(() => {
      timeCounter--;
      updateDOMTime()
      console.log(timeCounter);
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
  timerForm.reset()

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
