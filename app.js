//Part 1 Handling the timers
const studyingTimerElement = document.querySelector(".main__work-card>p");
const breakTimerElement = document.querySelector(".main__pause-card>p");
let totalAmountOfSecondsStudying = 1800; //30 minutes
let totalAmountOfSecondsBreak = 300; //5 minutes

function studyingTimer(totalAmountOfSeconds) {
  let currentMinutes = parseInt(totalAmountOfSeconds / 60);
  let currentSeconds = totalAmountOfSeconds % 60;
  do {
    setTimeout(() => {
      if (totalAmountOfSeconds < 0) {
        return;
      }
      if (currentMinutes < 1) {
        currentMinutes = `0${currentMinutes}`;
      }
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      studyingTimerElement.textContent = `${currentMinutes}:${currentSeconds}`;
      console.log({ totalAmountOfSeconds });
      console.log({ currentMinutes }, { currentSeconds });
      totalAmountOfSeconds--;
    }, 1000);
  } while (totalAmountOfSeconds >= 0);
}
studyingTimer(totalAmountOfSecondsStudying);

// function breakTimer(totalAmountOfSeconds) {
//   setInterval(() => {
//     if (totalAmountOfSeconds < 0) {
//       totalAmountOfSeconds = 3;
//       return;
//     }
//     let currentMinutes = parseInt(totalAmountOfSeconds / 60);
//     let currentSeconds = totalAmountOfSeconds % 60;
//     if (currentMinutes < 1) {
//       currentMinutes = `0${currentMinutes}`;
//     }
//     if (currentSeconds < 10) {
//       currentSeconds = `0${currentSeconds}`;
//     }
//     breakTimerElement.textContent = `${currentMinutes}:${currentSeconds}`;
//     totalAmountOfSeconds--;
//     console.log({ totalAmountOfSeconds });
//     console.log({ currentMinutes }, { currentSeconds });
//   }, 1000);
// }

//Part 2 handling the buttons features
const pausePlayButton = document.querySelector(".main__pause-button");

const pauseIcon = document.querySelector(
  ".main__pause-button > i:nth-child(1)"
);
const playIcon = document.querySelector(".main__pause-button > i:nth-child(2)");

const restartButton = document.querySelector(".main__restart-button");

pausePlayButton.addEventListener("click", pauseTimers);
restartButton.addEventListener("click", restartTimer);

//Part 3 handling the number of cycles
const numberOfCyclesElement = document.querySelector(".main__info span");
let amountOfCycles = 1;

function restartTimer(e) {
  amountOfCycles = 0;
  numberOfCyclesElement.textContent = amountOfCycles;
}

function pauseTimers(e) {
  if (pauseIcon.classList.contains("hide")) {
    pauseIcon.classList.replace("hide", "show");
    playIcon.classList.replace("show", "hide");
  } else {
    playIcon.classList.replace("hide", "show");
    pauseIcon.classList.replace("show", "hide");
  }
}
console.log(pauseIcon);
