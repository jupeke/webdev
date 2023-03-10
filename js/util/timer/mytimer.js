const hoursTextField = document.getElementById("hours");
const minutesTextField = document.getElementById("minutes");
const secondsTextField = document.getElementById("seconds");
const startBtn = document.getElementById("start-button");
const pauseBtn = document.getElementById("pause-button");
const progBarElapsed = document.getElementById("progress-bar-elapsed");

class Timer{
    constructor(){
        this.totalTime = 0;
        this.setIntID = -1;
    }
    
    start(){
        // The total time in milliseconds
        this.totalTime = 
            (
                parseInt(hours.value) * 60 + 
                parseInt(minutes.value) * 60 + 
                parseInt(seconds.value)
            ) * 1000;

        // The number of milliseconds since January 1, 1970:
        startTime = Date.now(); 
        endTime = startTime + totalTime;

        // This thing called arrow function (ES6) works! It
        // preserves the local scope of "this".
        this.setIntID = setTimeout(() => {
            this.updateTimea();
        }, 1000);
    }
    updateTime(){

    }
    pause(){
        
    }
}
const timer = new Timer();
startBtn.addEventListener("click", timer.start);