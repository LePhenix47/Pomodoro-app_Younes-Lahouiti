//Part 1 Handling the timers
const studyingTimerElement = document.querySelector(".main__work-card>p");
const breakTimerElement = document.querySelector(".main__pause-card>p");

const workCard = document.querySelector(".main__work-card");

const pauseCard = document.querySelector(".main__pause-card");

const timerCards = document.querySelectorAll(".timer__card");

let totalAmountOfSecondsStudying = 1800; //30 minutes = 1800 seconds
let totalAmountOfSecondsBreak = 300; //5 minutes = 300 seconds

let isTimerPaused = true;

const numberOfCyclesElement = document.querySelector(".main__info span");
let amountOfCycles = 0;

function studyTimer() {
  if (!isTimerPaused) {
    //If the timer isn't paused
    if (!workCard.classList.contains("active")) {
      //If the element doesn't contain the 'active' class
      workCard.classList.add("active");
    }

    const activeAnimation = document.querySelector(".active");
    activeAnimation.style.animationPlayState = "running";

    //Format the time
    let currentMinutes = Math.trunc(totalAmountOfSecondsStudying / 60);
    let currentSeconds = totalAmountOfSecondsStudying % 60;

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    studyingTimerElement.textContent = `${currentMinutes}:${currentSeconds}`;

    //Stop the current timer and start the other one
    if (totalAmountOfSecondsStudying < 0) {
      console.log("Study time over, time for the 5 minute break");
      workCard.classList.remove("active");

      totalAmountOfSecondsStudying = 1800;

      clearInterval(studyingTimerInterval);

      pauseTimerInterval = setInterval(pauseTimer, 1000);

      amountOfCycles += 0.5;

      studyingTimerElement.textContent = "30:00";

      numberOfCyclesElement.textContent = Math.trunc(amountOfCycles);
      return;
    }
    totalAmountOfSecondsStudying--;
  } else {
    //If the timer is paused we want the animation to be paused as well
    if (workCard.classList.contains("active")) {
      const activeAnimation = document.querySelector(".active");
      activeAnimation.style.animationPlayState = "paused";
    }
    console.log("Study timer status: paused");
  }
}

let studyingTimerInterval = setInterval(studyTimer, 1000);

let pauseTimerInterval = setInterval(pauseTimer, 1000);
clearInterval(pauseTimerInterval);

function pauseTimer() {
  if (!isTimerPaused) {
    //If the timer isn't paused
    if (!pauseCard.classList.contains("active")) {
      //If the element doesn't contain the 'active' class
      pauseCard.classList.add("active");
    }

    const activeAnimation = document.querySelector(".active");
    activeAnimation.style.animationPlayState = "running";

    //Format the time
    let currentMinutes = Math.trunc(totalAmountOfSecondsBreak / 60);
    let currentSeconds = totalAmountOfSecondsBreak % 60;

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    breakTimerElement.textContent = `${currentMinutes}:${currentSeconds}`;

    //Stop the current timer and start the other one
    if (totalAmountOfSecondsBreak < 0) {
      console.log("Study time over, time for the 5 minute break");
      pauseCard.classList.remove("active");

      totalAmountOfSecondsBreak = 300;

      clearInterval(pauseTimerInterval);

      studyingTimerInterval = setInterval(studyTimer, 1000);

      amountOfCycles += 0.5;

      breakTimerElement.textContent = "5:00";

      numberOfCyclesElement.textContent = Math.trunc(amountOfCycles);
      return;
    }
    totalAmountOfSecondsBreak--;
  } else {
    //If the timer is paused we want the animation to be paused as well
    if (pauseCard.classList.contains("active")) {
      const activeAnimation = document.querySelector(".active");
      activeAnimation.style.animationPlayState = "paused";
    }
    console.log("Break time status: paused");
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

function pauseTimers() {
  console.log("Pausing timer");
  if (pauseIcon.classList.contains("hide")) {
    //We play the timer
    isTimerPaused = false;
    pauseIcon.classList.replace("hide", "show");
    playIcon.classList.replace("show", "hide");
  } else {
    //We pause the timer
    isTimerPaused = true;
    playIcon.classList.replace("hide", "show");
    pauseIcon.classList.replace("show", "hide");
  }
}

function restartTimer() {
  console.log("Restarting");
  playIcon.classList.replace("hide", "show");
  pauseIcon.classList.replace("show", "hide");
  for (let i = 0; i < timerCards.length; i++) {
    if (timerCards[i].classList.contains("active")) {
      timerCards[i].classList.remove("active");
    }
    i === 1
      ? (breakTimerElement.textContent = "5:00")
      : (studyingTimerElement.textContent = "30:00");
  }
  isTimerPaused = true;
  totalAmountOfSecondsStudying = 1800;
  totalAmountOfSecondsBreak = 300;
  amountOfCycles = 0;
  numberOfCyclesElement.textContent = amountOfCycles;
}
