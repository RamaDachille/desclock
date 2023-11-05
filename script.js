const button = document.querySelector(".button");
const buttonIcon = document.getElementById("play-icon");
let minutes = document.querySelector(".mins");
let secsAndMills = document.querySelector(".blue-text");

// STOPWATCH
let timeCounter = 0;
let stopwatchRunning = false;
let intervalId;

let mins = 0;
let secs = 0;
let mills = 0;

const startTimer = function () {
  if (!stopwatchRunning) {
    buttonIcon.classList.add('fa-pause')
    buttonIcon.classList.remove('fa-play')
    
    stopwatchRunning = true;
    intervalId = setInterval(() => {
      mins = (Math.floor(timeCounter / 100 / 60) + "").padStart(2, "0");
      secs = (Math.floor((timeCounter / 100) % 60) + "").padStart(2, "0");
      mills = ((timeCounter % 100) + "").padStart(2, "0");

      minutes.textContent = mins;
      secsAndMills.textContent = `${secs}:${mills}`;

      timeCounter++;
    }, 10);
  } else {
    buttonIcon.classList.remove('fa-pause')
    buttonIcon.classList.add('fa-play')

    stopwatchRunning = false;
    clearInterval(intervalId);
  }
};

button.addEventListener("click", startTimer);
