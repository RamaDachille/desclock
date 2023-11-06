const playButton = document.querySelector(".play-button");
const restartButton = document.querySelector(".restart-button");
const lapButton = document.querySelector(".lap-button");
const buttonIcon = document.getElementById("play-icon");
const lapIcon = document.getElementById("lap-icon");

const lapsBody = document.querySelector("tbody");
const lapsTable = document.querySelector(".laps");

let minutes = document.querySelector(".mins");
let secsAndMills = document.querySelector(".blue-text");

// STOPWATCH
let timeCounter = 0;
let stopwatchRunning = false;
let intervalId;
let laps = [0];

const calcTime = function (unit, time = timeCounter) {
  if (unit === "minutes") return Math.floor(time / 100 / 60);
  if (unit === "seconds") return Math.floor((time / 100) % 60);
  if (unit === "milliseconds") return time % 100;
};

const formatTime = (timeNum) => (timeNum + "").padStart(2, "0");

const startTimer = function () {
  if (!stopwatchRunning) {
    buttonIcon.classList.remove("fa-play");
    buttonIcon.classList.add("fa-pause");

    restartButton.classList.remove("hidden");
    lapButton.classList.remove("hidden");
    lapsTable.classList.remove("hidden");

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

    buttonIcon.classList.remove("fa-pause");
    buttonIcon.classList.add("fa-play");
  }
};

const restartTimer = function () {
  clearInterval(intervalId);
  timeCounter = 0;
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

playButton.addEventListener("click", startTimer);
restartButton.addEventListener("click", restartTimer);
lapButton.addEventListener("click", createLap);
