const pages = document.querySelectorAll(".navbar div");
const stopwatch = document.querySelector(".stopwatch");
const timer = document.querySelector(".timer");
const timeText = document.querySelector(".time");
const timerForm = document.getElementById("timer-form");

const playBtn = document.querySelector(".play-button");
const restartBtn = document.querySelector(".restart-button");
const lapBtn = document.querySelector(".lap-button");
const btnIcon = document.getElementById("play-icon");
const lapIcon = document.getElementById("lap-icon");

const lapsBody = document.querySelector("tbody");
const lapsTable = document.querySelector(".laps");

let minutes = document.querySelector(".mins");
let secsAndMills = document.querySelector(".blue-text");

// PAGINATION
let curPage = stopwatch;

const pageChanger = function (page) {
  restartTimer();
  if (page === timer) timeText.classList.add("hidden");
  else timeText.classList.remove("hidden");

  page.classList.add("active");
  curPage.classList.remove("active");
  curPage = page;
};

Array.from(pages).forEach((page) => {
  page.addEventListener("click", function () {
    if (page.classList.contains("timer")) {
      pageChanger(timer);
      timerForm.classList.remove('hidden')
      document.getElementById("seconds").focus();
    } else if (page.classList.contains("stopwatch")) {
      timerForm.classList.add('hidden')
      pageChanger(stopwatch);
    }
  });
});

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

const startTimer = function (increase = true) {
  if (!stopwatchRunning) {
    btnIcon.classList.remove("fa-play");
    btnIcon.classList.add("fa-pause");

    [restartBtn, lapBtn, lapsTable].forEach((b) =>
      b.classList.remove("hidden")
    );

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

// TIMER
timerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(timerForm.elements)
  console.log(timerForm.elements.hours.value)
});
// timerForm.submit(); should be in playBtn event

// EVENTS
playBtn.addEventListener("click", startTimer);
restartBtn.addEventListener("click", restartTimer);
lapBtn.addEventListener("click", createLap);
