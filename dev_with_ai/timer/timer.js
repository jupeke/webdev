// Get the HTML elements
const timeLeft = document.getElementById("time-left");
const progressBar = document.getElementById("progress-bar");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

let intervalId; // The ID of the setInterval timer
let startTime; // The time the timer started
let endTime; // The time the timer will end
let totalTime; // The total time of the timer in milliseconds

// Start the timer
function startTimer() {
  // Calculate the total time of the timer in milliseconds
  totalTime = (parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value)) * 1000;

  // Set the start and end times
  startTime = Date.now();
  endTime = startTime + totalTime;

  // Update the time left every second
  intervalId = setInterval(updateTime, 1000);

  // Disable the input fields and start button
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  startButton.disabled = true;
}

// Stop the timer
function stopTimer() {
  // Clear the setInterval timer
  clearInterval(intervalId);

  // Enable the input fields and start button
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  startButton.disabled = false;
}

// Update the time left and progress bar
function updateTime() {
  // Calculate the time left in milliseconds
  const timeRemaining = endTime - Date.now();

  // Calculate the minutes and seconds remaining
  const minutesRemaining = Math.floor(timeRemaining / 1000 / 60);
  const secondsRemaining = Math.floor((timeRemaining / 1000) % 60);

  // Update the time left HTML element
  timeLeft.innerHTML = `${minutesRemaining.toString().padStart(2, "0")}:${secondsRemaining.toString().padStart(2, "0")}`;
  timeLeft.innerHTML = secondsRemaining;
  // Calculate the percentage of time elapsed
  const timeElapsed = totalTime - timeRemaining;
  const percentageElapsed = (timeElapsed / totalTime) * 100;

  // Update the progress bar
  progressBar.style.width = `${percentageElapsed}%`;

  // Change the color of the progress bar based on the percentage elapsed
  if (percentageElapsed > 75) {
    progressBar.style.backgroundColor = "red";
  } else if (percentageElapsed > 50) {
    progressBar.style.backgroundColor = "orange";
  } else {
    progressBar.style.backgroundColor = "green";
  }

  // If the timer has ended, stop the timer
  if (timeRemaining <= 0) {
    stopTimer();
  }
}

// Add event listeners to the buttons
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
