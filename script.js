const playButton = document.querySelector(".play-button");
const restartButton = document.querySelector(".restart-button");
const lapButton = document.querySelector(".lap-button");
const buttonIcon = document.getElementById("play-icon");

const lapsBody = document.querySelector("tbody");
const lapsTable = document.querySelector(".laps");

let minutes = document.querySelector(".mins");
let secsAndMills = document.querySelector(".blue-text");

// STOPWATCH
let timeCounter = 0;
let stopwatchRunning = false;
let intervalId;

let laps = [0];

const calcTime = function (time, unit) {
  if (unit === "minutes") return Math.floor(time / 100 / 60);
  if (unit === "seconds") return Math.floor((time / 100) % 60);
  if (unit === "milliseconds") return time % 100;
};

const formatTime = (timeNum) => (timeNum + "").padStart(2, "0");

const startTimer = function () {
  if (!stopwatchRunning) {
    buttonIcon.classList.add("fa-pause");
    buttonIcon.classList.remove("fa-play");

    restartButton.classList.remove("hidden");
    lapButton.classList.remove("hidden");

    lapsTable.classList.remove("hidden");

    stopwatchRunning = true;
    intervalId = setInterval(() => {
      minutes.textContent = formatTime(calcTime(timeCounter, "minutes"));
      secsAndMills.textContent = `${formatTime(
        calcTime(timeCounter, "seconds")
      )}.${formatTime(calcTime(timeCounter, "milliseconds"))}`;

      timeCounter++;
    }, 10);
  } else {
    clearInterval(intervalId);
    stopwatchRunning = false;

    buttonIcon.classList.remove("fa-pause");
    buttonIcon.classList.add("fa-play");
  }
};

const restartTimer = function () {
  clearInterval(intervalId);
  stopwatchRunning = false;

  buttonIcon.classList.remove("fa-pause");
  buttonIcon.classList.add("fa-play");

  minutes.textContent = "00";
  secsAndMills.textContent = `00.00`;

  restartButton.classList.add("hidden");
  lapButton.classList.add("hidden");

  laps = [0];
  while (lapsBody.firstChild) lapsBody.removeChild(lapsBody.firstChild);
  lapsTable.classList.add("hidden");
};

const createLap = function () {
  laps.push(timeCounter);

  let curMins = formatTime(calcTime(timeCounter, "minutes"));
  let curSecs = formatTime(calcTime(timeCounter, "seconds"));
  let curMils = formatTime(calcTime(timeCounter, "milliseconds"));
  let lapMin = formatTime(calcTime(timeCounter - laps.at(-2), "minutes"));
  let lapSec = formatTime(calcTime(timeCounter - laps.at(-2), "seconds"));
  let lapMil = formatTime(calcTime(timeCounter - laps.at(-2), "milliseconds"));

  lapsBody.insertAdjacentHTML(
    "afterbegin",
    `<tr>
      <td>${formatTime(laps.length)}</td>
      <td>+ ${lapMin}:${lapSec}.${lapMil}</td>
      <td>${curMins}:${curSecs}.${curMils}</td>
    </tr>`
  );
};

playButton.addEventListener("click", startTimer);
restartButton.addEventListener("click", restartTimer);
lapButton.addEventListener("click", createLap);
