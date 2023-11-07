const pages = document.querySelectorAll(".navbar div");
const timer = document.querySelector(".timer");
const timeText = document.querySelector(".time");
const timerForm = document.getElementById("timer-form");

const playBtn = document.querySelector(".play-button");
const restartBtn = document.querySelector(".restart-button");
const btnIcon = document.getElementById("play-icon");

let minutes = document.querySelector(".mins");
let secsAndMills = document.querySelector(".blue-text");

// TIMER
let timeCounter = 0;
let stopwatchRunning = false;
let intervalId;

// FUNCTIONS
const calcTime = function (unit, time = timeCounter) {
  if (unit === "minutes") return Math.floor(time / 100 / 60);
  if (unit === "seconds") return Math.floor((time / 100) % 60);
  if (unit === "milliseconds") return time % 100;
};

const formatTime = (timeNum) => (timeNum + "").padStart(2, "0");

const startTimer = function () {
  if (!stopwatchRunning) {
    timerForm.requestSubmit()
    timerForm.classList.add("hidden")
    timeText.classList.remove("hidden")

    btnIcon.classList.remove("fa-play");
    btnIcon.classList.add("fa-pause");
    restartBtn.classList.remove("hidden")

    stopwatchRunning = true;

    intervalId = setInterval(() => {
      minutes.textContent = formatTime(calcTime("minutes"));
      secsAndMills.textContent = `${formatTime(
        calcTime("seconds")
      )}.${formatTime(calcTime("milliseconds"))}`;
      timeCounter--;
    }, 10);
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

  btnIcon.classList.remove("fa-pause");
  btnIcon.classList.add("fa-play");

  minutes.textContent = "00";
  secsAndMills.textContent = `00:00`;

  restartBtn.classList.add("hidden");
};

// TIMER
timerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  
  console.log(timerForm.elements.seconds.value);
});

// playBtn.addEventListener("click", function () {
//   timerForm.classList.remove("hidden")
//   timerForm.requestSubmit()
// });

// EVENTS
playBtn.addEventListener("click", startTimer)
restartBtn.addEventListener("click", restartTimer);