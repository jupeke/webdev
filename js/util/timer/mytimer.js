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
const plus1hBtn = document.getElementById("plus1h-button");
const plus1minBtn = document.getElementById("plus1min-button");
const plus5minBtn = document.getElementById("plus5min-button");
const plus15minBtn = document.getElementById("plus15min-button");
const plus1secBtn = document.getElementById("plus1sec-button");
const plus5secBtn = document.getElementById("plus5sec-button");
const plus15secBtn = document.getElementById("plus15sec-button");
const minus1hBtn = document.getElementById("minus1h-button");
const minus1minBtn = document.getElementById("minus1min-button");
const minus5minBtn = document.getElementById("minus5min-button");
const minus15minBtn = document.getElementById("minus15min-button");
const minus1secBtn = document.getElementById("minus1sec-button");
const minus5secBtn = document.getElementById("minus5sec-button");
const minus15secBtn = document.getElementById("minus15sec-button");
const progBarElapsed = document.getElementById("progress-bar-elapsed");
const defaultBgCol = document.body.style.backgroundColor;
pauseBtn.disabled = true;
startBtn.disabled = false;
resumeBtn.disabled = true;
stopBtn.disabled = true;
resetBtn.style.display = "none";

function disableTimeButtons(boolVal){
    let myVal = false;
    if(boolVal){
        myVal = true;
    }
    plus1hBtn.disabled = myVal;
    plus1minBtn.disabled = myVal;
    plus5minBtn.disabled = myVal;
    plus15minBtn.disabled = myVal;
    plus1secBtn.disabled = myVal;
    plus5secBtn.disabled = myVal;
    plus15secBtn.disabled = myVal;
    minus1hBtn.disabled = myVal;
    minus1minBtn.disabled = myVal;
    minus5minBtn.disabled = myVal;
    minus15minBtn.disabled = myVal;
    minus1secBtn.disabled = myVal;
    minus5secBtn.disabled = myVal;
    minus15secBtn.disabled = myVal;
}

class Timer{
    constructor(){
        this.totalTime = 0; // milliseconds
        this.startTime = 0; // milliseconds
        this.timeLeftMilliSec = 0;  // Needed for Pause-Resume
        this.setIntID1 = -1;
        this.setIntID2 = -1;
        this.counter = 0;
    }
    // The arrow function is a must here! 'this' must be a reference
    // to a timer object, not to the calling element (a button).
    start = () => {
        // The total time in milliseconds
        this.totalTime = 1000 * this.getTime();
        this.timeLeftMilliSec = this.totalTime;

        // The number of milliseconds since January 1, 1970:
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
        disableTimeButtons(true);
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
        disableTimeButtons(false);
        document.body.style.backgroundColor = defaultBgCol;
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
            timeLeftLabel.innerHTML = "Time left";
        } else{
            timeLeftLabel.innerHTML = "Time left (min:sec)";
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
                document.body.style.backgroundColor = "red";
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

    // Set time in seconds to the text fields.
    setTime(newTimeSec){
        let timeHours = Math.floor(newTimeSec/3600);
        let newTimeSec2 = newTimeSec - timeHours * 3600; // hours = 0 ok
        let timeMinutes = Math.floor(newTimeSec2 / 60);
        let timeSeconds = newTimeSec2 - timeMinutes * 60; // minutes = 0 ok

        hours.value = timeHours;
        minutes.value = timeMinutes;
        seconds.value = timeSeconds;

        this.showTimeAtStart();
    }
    changeTime(changeSec){
        let time = this.getTime();
        let newTime = time+changeSec;
        if (newTime < 0){
            newTime = 0;
        }
        this.setTime(newTime);
    }
    setTimePlus1h = () => {
        this.changeTime(3600);
    }
    setTimePlus15min = () => {
        this.changeTime(900);
    }
    setTimePlus5min = () => {
        this.changeTime(300);
    }
    setTimePlus1min = () => {
        this.changeTime(60);
    }
    setTimePlus15s = () => {
        this.changeTime(15);
    }
    setTimePlus5s = () => {
        this.changeTime(5);
    }
    setTimePlus1s = () => {
        this.changeTime(1);
    }
    setTimeMinus1h = () => {
        this.changeTime(-3600);
    }
    setTimeMinus15min = () => {
        this.changeTime(-900);
    }
    setTimeMinus5min = () => {
        this.changeTime(-300);
    }
    setTimeMinus1min = () => {
        this.changeTime(-60);
    }
    setTimeMinus15s = () => {
        this.changeTime(-15);
    }
    setTimeMinus5s = () => {
        this.changeTime(-5);
    }
    setTimeMinus1s = () => {
        this.changeTime(-1);
    }
}

function init(){
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
    plus1hBtn.addEventListener("click", timer.setTimePlus1h);
    plus1minBtn.addEventListener("click", timer.setTimePlus1min);
    plus5minBtn.addEventListener("click", timer.setTimePlus5min);
    plus15minBtn.addEventListener("click", timer.setTimePlus15min);
    plus1secBtn.addEventListener("click", timer.setTimePlus1s);
    plus5secBtn.addEventListener("click", timer.setTimePlus5s);
    plus15secBtn.addEventListener("click", timer.setTimePlus15s);
    minus1hBtn.addEventListener("click", timer.setTimeMinus1h);
    minus1minBtn.addEventListener("click", timer.setTimeMinus1min);
    minus5minBtn.addEventListener("click", timer.setTimeMinus5min);
    minus15minBtn.addEventListener("click", timer.setTimeMinus15min);
    minus1secBtn.addEventListener("click", timer.setTimeMinus1s);
    minus5secBtn.addEventListener("click", timer.setTimeMinus5s);
    minus15secBtn.addEventListener("click", timer.setTimeMinus15s);
}

