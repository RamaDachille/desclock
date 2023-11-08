const timeText = document.querySelector(".time");
const timerForm = document.getElementById("timer-form");

// const formHrs = document.getElementById("hours");
// const formMins = document.getElementById("minutes");
const formSecs = document.getElementById("seconds");
// const hoursError = document.getElementById("hours-error");
// const minutesError = document.getElementById("minutes-error");
// const secondsError = document.getElementById("seconds-error");

const playBtn = document.querySelector(".play-button");
const playIcon = document.getElementById("play-icon");
const restartBtn = document.querySelector(".restart-button");
const audioBtn = document.querySelector(".lap-button");
const audioIcon = document.getElementById("audio-icon");

const timerIcon = document.querySelector(".timer i");
const timerNav = document.querySelector(".timer");

const timerUpModal = document.getElementById("timerUpModal");
const closeModalBtn = document.getElementById("closeModal");
const restartTimerBtn = document.getElementById("restartTimer");

let hours = document.querySelector(".mins");
let minsAndSecs = document.querySelector(".blue-text");
let alertHrs = document.querySelector(".alert-hrs");
let alertMinsSecs = document.querySelector(".alert-time");

// TIMER
let initialTime = (timeCounter = 0);
let stopwatchRunning = false;
let intervalId;
let audioMute = false;
const ringtone = new Audio("/ringtone.mp3");
// let initialTime = 0;

// FUNCTIONS
const calcTime = function (unit, time = timeCounter) {
  if (unit === "hours") return Math.floor(time / 60 / 60);
  if (unit === "minutes") return Math.floor((time % 3600) / 60);
  if (unit === "seconds") return Math.floor(time % 60);
};

const formatTime = (timeNum) => (timeNum + "").padStart(2, "0");

const updateDOMTime = function (
  hrs = hours,
  minsSecs = minsAndSecs,
  time = timeCounter
) {
  hrs.textContent = formatTime(calcTime("hours", time));
  minsSecs.textContent = `${formatTime(calcTime("minutes", time))}:${formatTime(
    calcTime("seconds", time)
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
    if (initialTime === timeCounter) timerForm.requestSubmit();

    timerForm.classList.add("hidden");
    timeText.classList.remove("hidden");

    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    restartBtn.classList.remove("hidden");
    audioBtn.classList.remove("hidden");

    intervalId = setInterval(() => {
      if (timeCounter > 0) timeCounter--;
      updateDOMTime();
      if (timeCounter < 1) {
        timerUpModal.style.display = "block";
        updateDOMTime(alertHrs, alertMinsSecs, initialTime)
        restartTimer(false);
        timerIcon.classList.add("fa-shake");
        if (!audioMute) ringtone.play();
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
    stopwatchRunning = false;

    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
};

const restartTimer = function (clear = true, initTime = 0) {
  if (clear) {
    timeText.classList.add("hidden");
    timerForm.classList.remove("hidden");
    formSecs.focus();
    timerForm.reset();
  }
  clearInterval(intervalId);
  initialTime = timeCounter = initTime;
  stopwatchRunning = false;

  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  restartBtn.classList.add("hidden");
  audioBtn.classList.add("hidden");
};

const closeWindow = function (restartTime = true) {
  timerUpModal.style.display = "none";
  timerIcon.classList.remove("fa-shake");
  ringtone.pause();
  ringtone.currentTime = 0;
  restartTime ? restartTimer() : startTimer();
};

// const validateForm = function (e) {
//   const inputElement = e.target;
//   const inputValue = parseInt(inputElement.value, 10);

//   if (
//     isNaN(inputValue) ||
//     inputValue < parseInt(inputElement.min, 10) ||
//     inputValue > parseInt(inputElement.max, 10)
//   ) {
//     inputElement.setCustomValidity("Value is out of range.");
//     displayErrorMessage(inputElement);
//   } else {
//     inputElement.setCustomValidity("");
//     displayErrorMessage(inputElement, false);
//   }
// };

// const displayErrorMessage = function (inputElement, show = true) {
//   const errorId = inputElement.id + "-error";
//   const errorElement = document.getElementById(errorId);

//   if (show) {
//     errorElement.textContent = inputElement.validationMessage;
//     console.log(inputElement.validationMessage);
//     errorElement.style.display = "block";
//   } else {
//     errorElement.textContent = "";
//     errorElement.style.display = "none";
//   }
// };

// EVENTS

// Form validation
// formHrs.addEventListener("input", validateForm);
// formMins.addEventListener("input", validateForm);
// formSecs.addEventListener("input", validateForm);

playBtn.addEventListener("click", startTimer);
restartBtn.addEventListener("click", restartTimer);
closeModalBtn.addEventListener("click", closeWindow);

restartTimerBtn.addEventListener("click", () => {
  closeWindow(false);
});
audioBtn.addEventListener("click", function () {
  audioIcon.classList.toggle("fa-volume-high");
  audioIcon.classList.toggle("fa-volume-xmark");
  if (audioIcon.classList.contains("fa-volume-high")) audioMute = false;
  else audioMute = true;
});

// Focuses the form's text cursor when reloading
formSecs.focus();
document.addEventListener("DOMContentLoaded", () => formSecs.focus());
timerNav.addEventListener("click", () => formSecs.focus());
