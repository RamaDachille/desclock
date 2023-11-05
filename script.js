const button = document.querySelector(".button");
let minutes = document.querySelector(".mins");
let secsAndMills = document.querySelector(".blue-text");

// STOPWATCH
let timeCounter = 0;
let stopwatchPaused = false

let mins = 0;
let secs = 0;
let mills = 0;

const startTimer = function () {
  setInterval(() => {
    mins = (Math.floor(timeCounter / 100 / 60) +'').padStart(2, '0')
    secs = (Math.floor((timeCounter / 100) % 60) +'').padStart(2, '0')
    mills = (timeCounter % 100 +'').padStart(2, '0')

    minutes.textContent = mins
    secsAndMills.textContent = `${secs}:${mills}`
    
    timeCounter++;
  }, 10);
};

button.addEventListener("click", startTimer);
