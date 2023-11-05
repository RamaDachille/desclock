const playButton = document.querySelector(".play-button");
const restartButton = document.querySelector(".restart-button");
const lapButton = document.querySelector(".lap-button");
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

    restartButton.classList.remove('hidden')
    lapButton.classList.remove('hidden')
    
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

const restartTimer = function() {
  clearInterval(intervalId);
  stopwatchRunning = false;

  buttonIcon.classList.remove('fa-pause')
  buttonIcon.classList.add('fa-play')
  
  minutes.textContent = '00';
  secsAndMills.textContent = `00:00`;

  restartButton.classList.add('hidden')
  lapButton.classList.add('hidden')
}

playButton.addEventListener("click", startTimer);
restartButton.addEventListener("click", restartTimer);
