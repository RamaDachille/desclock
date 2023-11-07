const playBtn = document.querySelector(".play-button");
const restartBtn = document.querySelector(".restart-button");
const lapBtn = document.querySelector(".lap-button");
const playIcon = document.getElementById("play-icon");
const lapIcon = document.getElementById("lap-icon");

const lapsBody = document.querySelector("tbody");
const lapsTable = document.querySelector(".laps");

let minutes = document.querySelector(".mins");
let secsAndMills = document.querySelector(".blue-text");

// STOPWATCH
let timeCounter = 0;
let stopwatchRunning = false;
let laps = [0];
let intervalId;

// FUNCTIONS
const calcTime = function (unit, time = timeCounter) {
  if (unit === "minutes") return Math.floor(time / 100 / 60);
  if (unit === "seconds") return Math.floor((time / 100) % 60);
  if (unit === "milliseconds") return time % 100;
};

const formatTime = (timeNum) => (timeNum + "").padStart(2, "0");

const startStopwatch = function () {
  if (!stopwatchRunning) {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");

    restartBtn.classList.remove("hidden")
    lapBtn.classList.remove("hidden")
    lapsTable.classList.remove("hidden")

    stopwatchRunning = true;
    intervalId = setInterval(() => {
      minutes.textContent = formatTime(calcTime("minutes"));
      secsAndMills.textContent = `${formatTime(
        calcTime("seconds")
      )}.${formatTime(calcTime("milliseconds"))}`;
      timeCounter++;
    }, 10);
  } else {
    clearInterval(intervalId);
    stopwatchRunning = false;

    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
  }
};

const restartStopwatch = function () {
  clearInterval(intervalId);
  timeCounter = 0;
  stopwatchRunning = false;

  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");

  minutes.textContent = "00";
  secsAndMills.textContent = `00.00`;

  restartBtn.classList.add("hidden");
  lapBtn.classList.add("hidden");

  laps = [0];
  while (lapsBody.firstChild) lapsBody.removeChild(lapsBody.firstChild);
  lapsTable.classList.add("hidden");
};

const createLap = function () {
  laps.push(timeCounter);

  let curMins = formatTime(calcTime("minutes"));
  let curSecs = formatTime(calcTime("seconds"));
  let curMils = formatTime(calcTime("milliseconds"));
  let lapMin = formatTime(calcTime("minutes", timeCounter - laps.at(-2)));
  let lapSec = formatTime(calcTime("seconds", timeCounter - laps.at(-2)));
  let lapMil = formatTime(calcTime("milliseconds", timeCounter - laps.at(-2)));

  lapsBody.insertAdjacentHTML(
    "afterbegin",
    `<tr>
      <td>${formatTime(laps.length)}</td>
      <td>+ ${lapMin}:${lapSec}.${lapMil}</td>
      <td>${curMins}:${curSecs}.${curMils}</td>
    </tr>`
  );

  lapIcon.classList.remove("fa-regular");
  lapIcon.classList.add("fa-solid");

  setTimeout(function () {
    lapIcon.classList.remove("fa-solid");
    lapIcon.classList.add("fa-regular");
  }, 90);
};

// EVENTS
playBtn.addEventListener("click", startStopwatch);
restartBtn.addEventListener("click", restartStopwatch);
lapBtn.addEventListener("click", createLap);
