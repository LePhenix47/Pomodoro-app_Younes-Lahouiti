//Part 1 Handling the timers
const studyingTimerElement = document.querySelector(".main__work-card>p");
const breakTimerElement = document.querySelector(".main__pause-card>p");

const workCard = document.querySelector(".main__work-card");

const pauseCard = document.querySelector(".main__pause-card");

const spinningCardAnimationPseudoElement =
  document.querySelector(".active::after");

let totalAmountOfSecondsStudying = 6; //30 minutes = 1800 seconds
let totalAmountOfSecondsBreak = 1; //5 minutes = 300 seconds

let isTimerPaused = true;

const numberOfCyclesElement = document.querySelector(".main__info span");
let amountOfCycles = 0;

/*
Trying to refactor the function

function studyTimer(cardElement, totalAmountOfSeconds,timerElement, currentTimerInterval, nextTimerInterval) {
 if(!isTimerPaused){ 
  if (!cardElement.classList.contains("active")) {
    cardElement.classList.add("active");
  }
  let currentMinutes = Math.trunc(totalAmountOfSeconds / 60);
  let currentSeconds = totalAmountOfSeconds % 60;

  if (currentSeconds < 10) {
    currentSeconds = `0${currentSeconds}`;
  }

  timerElement.textContent = `${currentMinutes}:${currentSeconds}`;
  if (totalAmountOfSeconds < 0) {
    cardElement.classList.remove("active");
    totalAmountOfSeconds = 6;
    clearInterval(currentTimerInterval);
    nextTimerInterval = setInterval(typeOfTimer, 1000);
    amountOfCycles += 0.5;
    timerElement.textContent = totalAmountOfSeconds;
    console.log({ amountOfCycles });
    numberOfCyclesElement.textContent = Math.trunc(amountOfCycles);
    return;
  }
  totalAmountOfSeconds--;
  console.log({ totalAmountOfSeconds });
  console.log({ currentMinutes }, { currentSeconds });}
}
*/

function studyTimer() {
  if (!isTimerPaused) {
    if (!workCard.classList.contains("active")) {
      workCard.classList.add("active");
    }
    let currentMinutes = Math.trunc(totalAmountOfSecondsStudying / 60);
    let currentSeconds = totalAmountOfSecondsStudying % 60;

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    studyingTimerElement.textContent = `${currentMinutes}:${currentSeconds}`;
    if (totalAmountOfSecondsStudying < 0) {
      console.log("Study time over, time for the 5 minute break");
      workCard.classList.remove("active");
      totalAmountOfSecondsStudying = 6;
      clearInterval(studyingTimerInterval);
      pauseTimerInterval = setInterval(pauseTimer, 1000);
      amountOfCycles += 0.5;
      studyingTimerElement.textContent = "30:00";
      console.log({ amountOfCycles });
      numberOfCyclesElement.textContent = Math.trunc(amountOfCycles);
      return;
    }
    totalAmountOfSecondsStudying--;
    console.log({ totalAmountOfSecondsStudying });
    console.log({ currentMinutes }, { currentSeconds });
  } else {
    console.log("Paused");
  }
}

let studyingTimerInterval = setInterval(studyTimer, 1000);

let pauseTimerInterval = setInterval(pauseTimer, 1000);
clearInterval(pauseTimerInterval);

function pauseTimer() {
  if (!isTimerPaused) {
    if (!pauseCard.classList.contains("active")) {
      pauseCard.classList.add("active");
    }

    let currentMinutes = Math.trunc(totalAmountOfSecondsBreak / 60);
    let currentSeconds = totalAmountOfSecondsBreak % 60;

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    breakTimerElement.textContent = `${currentMinutes}:${currentSeconds}`;
    if (totalAmountOfSecondsBreak < 0) {
      console.log("Break time over, time for the 30 minute studying session");
      pauseCard.classList.remove("active");

      totalAmountOfSecondsBreak = 1;
      clearInterval(pauseTimerInterval);
      studyingTimerInterval = setInterval(studyTimer, 1000);
      breakTimerElement.textContent = "5:00";
      amountOfCycles += 0.5;
      numberOfCyclesElement.textContent = Math.trunc(amountOfCycles);
      return;
    }
    totalAmountOfSecondsBreak--;
    console.log({ totalAmountOfSecondsBreak });
    console.log({ currentMinutes }, { currentSeconds });
  }
}

//Part 2 handling the buttons features
const pausePlayButton = document.querySelector(".main__pause-button");

const pauseIcon = document.querySelector(
  ".main__pause-button > i:nth-child(1)"
);
const playIcon = document.querySelector(".main__pause-button > i:nth-child(2)");

const restartButton = document.querySelector(".main__restart-button");

pausePlayButton.addEventListener("click", pauseTimers);
restartButton.addEventListener("click", restartTimer);

function pauseTimers(e) {
  console.log("click");
  if (pauseIcon.classList.contains("hide")) {
    //We play the timer
    isTimerPaused = false;
    console.log(
      "PLAY Does the work card contain the 'active' class?",
      workCard.classList.contains(".active")
    );
    console.log({ spinningCardAnimationPseudoElement });
    pauseIcon.classList.replace("hide", "show");
    playIcon.classList.replace("show", "hide");
  } else {
    //We pause the timer
    console.log("PAUSE Does the work card contain the 'active' class?");
    isTimerPaused = true;
    playIcon.classList.replace("hide", "show");
    pauseIcon.classList.replace("show", "hide");
  }
}

function restartTimer() {
  isTimerPaused = true;
  console.log("click 2");
  totalAmountOfSecondsStudying = 6;
  totalAmountOfSecondsBreak = 1;
}

//Part 3 handling the number of cycles
