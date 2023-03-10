const hoursTextField = document.getElementById("hours");
const minutesTextField = document.getElementById("minutes");
const secondsTextField = document.getElementById("seconds");
const timeLeftDiv = document.getElementById("time-left");
const startBtn = document.getElementById("start-button");
const pauseBtn = document.getElementById("pause-button");
const progBarElapsed = document.getElementById("progress-bar-elapsed");

class Timer{
    constructor(){
        this.totalTime = 0;
        this.startTime = 0;
        this.setIntID = -1;
    }
    
    start(){
        // The total time in milliseconds
        this.totalTime = 
            1000* 
            (
                parseInt(hours.value) * 60 + 
                parseInt(minutes.value) * 60 + 
                parseInt(seconds.value)
            );

        // The number of milliseconds since January 1, 1970:
        this.startTime = Date.now(); 
        timer.run();
        pauseBtn.disabled = false;
        startBtn.disabled = true;
    }
    
    run(){
        // This thing called arrow function (ES6) works! It
        // preserves the local scope of "this".
        this.setIntID = setTimeout(() => {
            let elapsedTime = Date.now()-this.startTime;
            let timeLeft = this.startTime + this.totalTime - elapsedTime;
            timeLeftDiv.innerHTML = timeLeft;
            this.run();
        }, 1000);
    }

    updateTime(){
        let elapsedTime = Date.now()-this.startTime;
        let timeLeft = this.startTime + this.totalTime - elapsedTime;
        timeLeft.innerHTML = "hih"+timeLeft;

        /*if (elapsedTime > this.totalTime){
            clearInterval(this.setIntID);
            pauseBtn.disabled = true;
            startBtn.disabled = false;
        }*/
    }

    pause(){
        
    }
}
const timer = new Timer();
startBtn.addEventListener("click", timer.start);