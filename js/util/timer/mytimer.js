const hoursTextField = document.getElementById("hours");
const minutesTextField = document.getElementById("minutes");
const secondsTextField = document.getElementById("seconds");
const timeLeftDiv = document.getElementById("time-left");
const timeLeftLabel = document.getElementById("label-time-left");
const startBtn = document.getElementById("start-button");
const pauseBtn = document.getElementById("pause-button");
const resumeBtn = document.getElementById("resume-button");
const stopBtn = document.getElementById("stop-button");
const resetBtn = document.getElementById("reset-button");
const progBarElapsed = document.getElementById("progress-bar-elapsed");
pauseBtn.disabled = true;
startBtn.disabled = false;
resumeBtn.disabled = true;
stopBtn.disabled = true;
resetBtn.style.display = "none";

class Timer{
    constructor(){
        this.totalTime = 0; // milliseconds
        this.startTime = 0; // milliseconds
        this.timeLeftMilliSec = 0;  // Needed for Pause-Resume
        this.setIntID1 = -1;
        this.setIntID2 = -1;
        this.counter = 0;
    }
    // The arrow function is must here! 'this' must be a reference
    // to a timer object, not the calling element.
    start = () => {
        // The total time in milliseconds
        this.totalTime = 1000 * this.getTime();
        this.timeLeftMilliSec = this.totalTime;

        // The number of milliseconds since January 1, 1970:
        //this.startTime = Date.now();
        this.startTime = Date.now();
        timeLeftDiv.innerHTML = this.formatTime(this.totalTime/1000);
        this.runTime();
        this.runProgressBar();
        pauseBtn.disabled = false;
        startBtn.disabled = true;
        resumeBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.style.display = "none";
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
    }
    stop = () => {
        clearTimeout(this.setIntID1);
        clearTimeout(this.setIntID2);
        pauseBtn.disabled = true;
        startBtn.style.display = "none";
        resumeBtn.disabled = true;
        stopBtn.disabled = true;
        resetBtn.style.display = "inline";
        hours.disabled = false;
        minutes.disabled = false;
        seconds.disabled = false;
    }
    pause = () => {
        clearTimeout(this.setIntID1);
        clearTimeout(this.setIntID2);
        pauseBtn.disabled = true;
        startBtn.disabled = true;
        resumeBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.style.display = "none";
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
    }
    resume = () => {
        // The startTime changes.
        this.startTime =
            Date.now()-(this.totalTime-this.timeLeftMilliSec);
        this.runTime();
        this.runProgressBar();
        pauseBtn.disabled = false;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resumeBtn.disabled = true;
        resetBtn.style.display = "none";
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
    }
    reset = () => {
        this.showTimeAtStart();
        this.resetProgressBar();
        resetBtn.style.display = "none";
        startBtn.style.display = "inline";
        startBtn.disabled = false;
    }

    // Reads the time set at Hours, Minutes and Seconds and
    // returns it in seconds.
    getTime(){
        let timeSec =
            (
                parseInt(hours.value) * 3600 +
                parseInt(minutes.value) * 60 +
                parseInt(seconds.value)
            );
        return timeSec;
    }

    // Show the time at start. Note: in a normal function
    // this refers to the calling element (like input field).
    // Here a reference to the Timer object is needed, so a
    // Array function is needed.
    showTimeAtStart = () => {
        //alert(this);
        let time = this.getTime();
        this.totalTime = time * 1000;
        timeLeftDiv.innerHTML = this.formatTime(time);

        if(time > 3599){
            timeLeftLabel.innerHTML = "Time left (hh:mm:ss)";
        } else{
            timeLeftLabel.innerHTML = "Time left (mm:ss)";
        }
    }

    runTime(){
        // The arrow function preserves the local scope of "this".
        this.setIntID1 = setTimeout(() => {
            let endTime = this.startTime + this.totalTime;
            let timeLeftMilliSec = endTime-Date.now();
            let timeLeft = timeLeftMilliSec / 1000;
            this.updateTime(timeLeft);

            // Basically, the limit = 0, but in some cases
            // the timer tends to stop at 00:01..
            if(timeLeftMilliSec < 50){
                clearTimeout(this.setIntID1);
                pauseBtn.disabled = true;
                startBtn.disabled = false;
                resumeBtn.disabled = true;
                stopBtn.disabled = true;
                hours.disabled = false;
                minutes.disabled = false;
                seconds.disabled = false;
                resetBtn.style.display = "inline";
                startBtn.style.display = "none";
            } else{
                this.runTime();
            }
        }, 1000);
    }
    runProgressBar(){
        // The arrow function preserves the local scope of "this".
        this.setIntID2 = setTimeout(() => {
            let endTime = this.startTime + this.totalTime;
            let timeLeftMilliSec = endTime-Date.now();
            let timeLeft = timeLeftMilliSec / 1000;
            if(timeLeft < 0){
                clearTimeout(this.setIntID2);
                progBarElapsed.style.width = "100%";
            } else{
                this.timeLeftMilliSec = timeLeftMilliSec;
                this.updateProgressBar(timeLeft);
                this.runProgressBar();
            }
        }, 20);
    }

    // timeLeft is time in seconds.
    //updateTime=(timeLeft)=>{ This works, too.
    updateTime(timeLeft){
        let showTime = this.formatTime(timeLeft);
        timeLeftDiv.innerHTML = showTime;
    }

    // Format time in seconds to human readable form.
    formatTime(timeSecExact){
        let showHours = false;
        if(this.totalTime > 3599499){
            showHours = true;
        }
        let timeSec = Math.round(timeSecExact);
        let showTime = "";
        let hoursText = "";
        let minutesText = "";
        let secondsText = "";
        let hours = Math.floor(timeSec/3600);
        let timeSec2 = timeSec - hours * 3600; // hours = 0 ok, too!
        let minutes = Math.floor(timeSec2 / 60);
        let seconds = timeSec2 - minutes * 60; // minutes = 0 ok, too!

        if(timeSecExact < 0){
            if(showHours){
                showTime = "00:00:00";
            } else{
                showTime = "00:00";
            }
        } else {
            if (showHours){
                hoursText = "0"+hours+":";
                if(hours > 9){
                    hoursText = hours+":";
                }
            }
            minutesText = "0"+minutes+":";
            if(minutes > 9){
                minutesText = minutes+":";
            }
            secondsText = "0"+seconds;
            if(seconds > 9){
                secondsText = seconds;
            }
            showTime = hoursText+minutesText+secondsText;
        }

        return showTime;
    }

    updateProgressBar(timeLeft){
        // Progress bar:
        let ratio = (this.totalTime-timeLeft*1000)/this.totalTime*100;
        progBarElapsed.style.width = ratio+"%";
    }
    resetProgressBar(){
        progBarElapsed.style.width = "0%";
    }
}
const timer = new Timer();
timer.showTimeAtStart();
hours.addEventListener("change", timer.showTimeAtStart);
minutes.addEventListener("change", timer.showTimeAtStart);
seconds.addEventListener("change", timer.showTimeAtStart);
startBtn.addEventListener("click", timer.start);
stopBtn.addEventListener("click", timer.stop);
pauseBtn.addEventListener("click", timer.pause);
resumeBtn.addEventListener("click", timer.resume);
resetBtn.addEventListener("click", timer.reset);
