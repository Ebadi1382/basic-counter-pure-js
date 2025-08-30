const inputValue = document.body.querySelector("#inputNum");
const resetBtn = document.body.querySelector("#reset");
const startBtn = document.body.querySelector("#start");
const stopBtn = document.body.querySelector("#stop");
const setBtn = document.body.querySelector("#set");
const numberResult = document.body.querySelector("#numberResult");
const circlePercentage = document.body.querySelector(".circular-progress");

let progressInterval;
let currentNum;
let percent;
let inputNum;
let runningProgress = false;
let isPaused = false; // 🔥 NEW FLAG for stop/resume

// Start Timer
function startTimer() {
  stopBtn.value = "Stop";
  setBtn.classList.add("disable");
  setBtn.setAttribute("disabled", "true");
  runningProgress = true;
  startBtn.style.visibility = "hidden";
  resetBtn.classList.remove("disable");
  resetBtn.removeAttribute("disabled");

  progressInterval = setInterval(() => {
    isPaused = false;
    if (Math.sign(currentNum) === 1) {
      --currentNum;
      percent = (Number(currentNum) / inputNum) * 360;
      numberResult.textContent = currentNum;

      if (currentNum >= 1) {
        circlePercentage.style.setProperty("--deg", percent + "deg");
      } else {
        circlePercentage.style.setProperty("--deg", "360deg");
      }

      if (currentNum === 0) {
        clearInterval(progressInterval);
        setBtn.classList.remove("disable");
        setBtn.removeAttribute("disabled");
        startBtn.setAttribute("disabled", "true");
        startBtn.classList.add("disable");
        runningProgress = false;
        resetBtn.classList.add("disable");
        resetBtn.setAttribute("disabled", "true");
        stopBtn.setAttribute("hidden", "true");
        startBtn.removeAttribute("hidden");
        startBtn.style.visibility = "visible";
      }
    } else {
      clearInterval(progressInterval);
      alert("Enter a positive number.");
      setBtn.removeAttribute("disabled");
      setBtn.classList.remove("disable");
      runningProgress = false;
    }
  }, 1000);
}

// Enable start when input changes
inputValue.addEventListener("change", (e) => {
  e.preventDefault();
  currentNum = e.target.value;
  if (e.target.value.length > 0) {
    startBtn.classList.remove("disable");
    startBtn.removeAttribute("disabled");
  } else {
    startBtn.classList.add("disable");
    startBtn.setAttribute("disabled", "true");
  }
});

// Reset logic
resetBtn.addEventListener("click", () => {
  if (runningProgress) {
    clearInterval(progressInterval);
    isPaused = false;
    currentNum = 1;
    percent = 360;
    circlePercentage.style.setProperty("--deg", "360deg");
    numberResult.textContent = 0;
    startBtn.style.visibility = "visible";
    startBtn.classList.add("disable");
    startBtn.setAttribute("disabled", "true");
    startBtn.removeAttribute("hidden");
    stopBtn.setAttribute("hidden", "true");
    setBtn.classList.remove("disable");
    setBtn.removeAttribute("disabled");
    resetBtn.classList.add("disable");
    resetBtn.setAttribute("disabled", "true");
    runningProgress = false;
  } else {
    alert("The progress has not started");
  }
});

// Start button
startBtn.addEventListener("click", () => {
  if (!numberResult) {
    alert("Enter at least one number in the input.");
    return;
  } else {
    runningProgress = true;
    startTimer();
    stopBtn.removeAttribute("hidden");
    startBtn.setAttribute("hidden", "true");
  }
});

// 🔥 STOP/RESUME BUTTON
stopBtn.addEventListener("click", () => {
  if (!runningProgress) return;

  if (!isPaused) {
    // Pause the timer
    clearInterval(progressInterval);
    isPaused = true;
    stopBtn.value = "Resume";
  } else {
    // Resume the timer
    startTimer();
  }
});

// Set number button
setBtn.addEventListener("click", () => {
  if (runningProgress) return;
  if (!inputValue.value || Math.sign(inputValue.value) !== 1) {
    alert("Enter at least one positive number.");
    return;
  }
  if (Math.sign(currentNum) === 1) numberResult.textContent = inputValue.value;
  inputNum = inputValue.value;
  inputValue.value = "";
});
