const hoursTextField = document.getElementById("hours");
const minutesTextField = document.getElementById("minutes");
const secondsTextField = document.getElementById("seconds");
const timeLeftDiv = document.getElementById("time-left");
const startBtn = document.getElementById("start-button");
const pauseBtn = document.getElementById("pause-button");
const progBarElapsed = document.getElementById("progress-bar-elapsed");

let totalTime = 0;
let startTime = 0;

class Timer{
    constructor(){
        //this.totalTime = 0;
        //this.startTime = 0;
        this.setIntID = -1;
    }
    
    start(){
        // The total time in milliseconds
        totalTime = 
            1000* 
            (
                parseInt(hours.value) * 60 + 
                parseInt(minutes.value) * 60 + 
                parseInt(seconds.value)
            );

        // The number of milliseconds since January 1, 1970:
        //this.startTime = Date.now(); 
        startTime = Date.now(); 
        timeLeftDiv.innerHTML = totalTime/1000;
        //()=>{
          //  this.run();
        //}
        timer.run();    // Note: this.run() does not work, why?
        pauseBtn.disabled = false;
        startBtn.disabled = true;
    }
    
    run(){
        // This thing called arrow function (ES6) works! It
        // preserves the local scope of "this".
        this.setIntID = setTimeout(() => {
            let endTime = startTime + totalTime;
            let timeLeft = Math.round((endTime-Date.now())/1000);
            if(timeLeft < 0){
                clearTimeout(this.setIntID);
            } else{
                timeLeftDiv.innerHTML = timeLeft;
                this.run();
            }
        }, 1000);
    }

    updateTime(){
        let elapsedTime = Date.now()-startTime;
        let timeLeft = startTime + totalTime - elapsedTime;
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