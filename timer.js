const timeText = document.querySelector(".time");
const timerForm = document.getElementById("timer-form");
const seconds = document.getElementById("seconds");

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

// TIMER
let initialTime = (timeCounter = 0);
let stopwatchRunning = false;
let intervalId;
let audioMute = false
// let initialTime = 0;

const ringtone = new Audio('/ringtone.mp3')

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
        restartTimer(false);
        timerIcon.classList.add("fa-shake");
        if(!audioMute) ringtone.play()
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
    seconds.focus();
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

const closeWindow = function(restartTime = true) {
  timerUpModal.style.display = "none";
  timerIcon.classList.remove("fa-shake");
  ringtone.pause()
  ringtone.currentTime = 0
  restartTime ? restartTimer() : startTimer()
}

// EVENTS
playBtn.addEventListener("click", startTimer);
restartBtn.addEventListener("click", restartTimer);
closeModalBtn.addEventListener("click", closeWindow);

restartTimerBtn.addEventListener("click", () => {closeWindow(false)});
audioBtn.addEventListener('click', function() {
  audioIcon.classList.toggle('fa-volume-high')
  audioIcon.classList.toggle('fa-volume-xmark')
  if(audioIcon.classList.contains('fa-volume-high')) audioMute = false
  else audioMute = true
})

// Focuses the form's text cursor when reloading
seconds.focus();
document.addEventListener("DOMContentLoaded", () => seconds.focus());
timerNav.addEventListener("click", () => seconds.focus());