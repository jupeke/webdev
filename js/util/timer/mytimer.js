const hoursTextField = document.getElementById("hours");
const minutesTextField = document.getElementById("minutes");
const secondsTextField = document.getElementById("seconds");
const timeLeftDiv = document.getElementById("time-left");
const startBtn = document.getElementById("start-button");
const pauseBtn = document.getElementById("pause-button");
const progBarElapsed = document.getElementById("progress-bar-elapsed");

//let totalTime = 0;
//let startTime = 0;

class Timer{
    constructor(){
        this.totalTime = 0;
        this.startTime = 0;
        this.setIntID = -1;
    }
    // Without the arrow function structure this.run() command
    // did not work ("this.run is not a function"). Read more at
    // https://www.w3schools.com/js/js_arrow_function.asp
    start =()=>{
        // The total time in milliseconds
        this.totalTime = 
            1000* 
            (
                parseInt(hours.value) * 3600 + 
                parseInt(minutes.value) * 60 + 
                parseInt(seconds.value)
            );

        // The number of milliseconds since January 1, 1970:
        //this.startTime = Date.now(); 
        this.startTime = Date.now(); 
        timeLeftDiv.innerHTML = this.updateTime(this.totalTime/1000);
        this.run();
        pauseBtn.disabled = false;
        startBtn.disabled = true;
    }
    
    run(){
        // The arrow function preserves the local scope of "this".
        this.setIntID = setTimeout(() => {
            let endTime = this.startTime + this.totalTime;
            let timeLeft = Math.round((endTime-Date.now())/1000);
            if(timeLeft < 0){
                clearTimeout(this.setIntID);
                pauseBtn.disabled = true;
                startBtn.disabled = false;
            } else{
                this.updateTime(timeLeft);
                this.run();
            }
        }, 1000);
    }

    // timeLeft is time in seconds:
    updateTime(timeLeft){
        let showTime = "";
        let hours = Math.floor(timeLeft/3600);
        let timeLeft2 = timeLeft - hours * 3600; // hours = 0 ok, too!
        
        let minutes = Math.floor(timeLeft2 / 60);
        let seconds = timeLeft2 - minutes * 60; // minutes = 0 ok, too!

        if(hours > 0){

        }
        showTime = hours+":"+minutes+":"+seconds;
        timeLeftDiv.innerHTML = showTime;

    }

    pause(){
        
    }
}
const timer = new Timer();
startBtn.addEventListener("click", timer.start);