// NOTE: some features in the code here are from ECMAScript 6 (ES6)
//(the newest JavaScript standard from 6/2015) and only work
// in browsers supporting it (practically the most modern
// browsers do but no version of IE, for instance).
// Examples of the new notation: class, constructor, const, let

// Global variables and constants:
const monsterSpeed = 15;	// Constant giving the speed to move the monster (ES6).
const snowFallSpeed = 2; // Constant giving the speed to flakes to fall.
const groundLevel = getWindowHeight()-100; // from the roof!
const groundLevelMonster = groundLevel-95; // from the roof!
const monsterImageSrc = "images/snowEater.png";
const flakeImageSrc = "images/snowFlake.png";
var main = "";  // Instance of MainControl class

// Images that make the monster look like swallowing:
var swallowImageSources =
  [
    "images/snowEaterSwallow1.png",
    "images/snowEaterSwallow2.png",
    "images/snowEaterSwallow3.png",
    "images/snowEaterSwallow4.png",
    "images/snowEaterSwallow5.png",
    "images/snowEaterSwallow6.png",
    "images/snowEaterSwallow7.png",
    "images/snowEaterSwallow8.png",
    "images/snowEaterSwallow7.png",
    "images/snowEaterSwallow6.png",
    "images/snowEaterSwallow5.png",
    "images/snowEaterSwallow4.png",
    "images/snowEaterSwallow3.png",
    "images/snowEaterSwallow2.png",
    "images/snowEaterSwallow1.png",
    "images/snowEater.png"
  ];

// Classes:
/**
This class is a base class for all moving objects.
To add more features extend this class.
*/
class MovingObject {
  constructor(x,y,id,defaultStepLen){
    this.x = x;
    this.y = y;
    this.id = id;
    this.defaultStepLen = defaultStepLen;
    this.htmlElem = "";
  }

  // Makes the HTML element referred by id go one step to the direction and
  // step length given as parameters. Makes the change in the element
  // coordinates and updates the elem.style.values accordingly.
  makeStep(direction, stepLen) {
    let elem = find(this.id);  // let - variable with a block scope (ES6)

    // Unless the HTML element is found, there is no idea to go on.
    if(elem){
      let maxWidth = getWindowWidth()-80;
      let minWidth = -50;

      if(direction === "right"){
        if(this.x < maxWidth){
          this.x = this.x+stepLen;
          elem.style.left=this.x+"px";
        }
      } else if (direction === "left"){
        if(this.x > minWidth){
          this.x = this.x-stepLen;
          elem.style.left=this.x+"px";
        }
      } else if (direction === "up"){
        this.y = this.y-stepLen;
        elem.style.top=this.y+"px";
      } else if (direction === "down"){
        this.y = this.y+stepLen;
        elem.style.top=this.y+"px";
      }
    }
  }

  // Creates an img HTML element with the attributes
  // given as parameters (and id = this.id):
  createImgHtmlElem(imgSrc, classs){

    // Let's create new element only if it doesn't exist:
    if(!find(this.id)){
      this.htmlElem = document.createElement("img");

      // Creates and sets a id attribute value:
      let id_attr = document.createAttribute("id");
      id_attr.value = this.id;
      this.htmlElem.setAttributeNode(id_attr);

    } else{
      this.htmlElem = find(this.id);
    }

    // Creates and sets a class attribute value:
    let class_attr = document.createAttribute("class");
    class_attr.value = classs;
    this.htmlElem.setAttributeNode(class_attr);

    // Creates and sets a src attribute value:
    let srcAttr = document.createAttribute("src");
    srcAttr.value = imgSrc;
    this.htmlElem.setAttributeNode(srcAttr);

    // Sets the position:
    this.htmlElem.style.position = "absolute";
    this.htmlElem.style.left = this.x+"px";
    this.htmlElem.style.top = this.y+"px";

    document.body.appendChild(this.htmlElem);
  }
}

// SnowEater class (ES6):
class SnowEater extends MovingObject{

  constructor(x,y,id,imageSrc){
    super(x,y,id,monsterSpeed);
    super.createImgHtmlElem(imageSrc, "snowEater");
    this.imgIndex = 0;
    this.frameCounter = 0;  // slow down animation
    this.isMovingLeft = false;
    this.isMovingRight = false;
    this.stop = false;  // to stop horizontal movement
  }

  // Shows a series of images that make the monster swallow:
  swallow(){
    var src = "";
    if(this.imgIndex < swallowImageSources.length){
      src = swallowImageSources[this.imgIndex];
      this.htmlElem.src = src;

      // Image is changed only every 3rd time:
      if(this.frameCounter % 3 === 0){
        this.imgIndex++;
      }
      this.frameCounter++;
      requestAnimationFrame(this.swallow.bind(this));
    } else{
      this.imgIndex = 0;
    }
  }
}

// SnowFlake class:
class SnowFlake extends MovingObject{
	constructor(x,y,id,imageSrc){
      super(x,y,id,snowFallSpeed);
      super.createImgHtmlElem(imageSrc, "snowFlake");
  }

  // Sends the flake back up to the point (rand_x,0):
  sendFlakeUp(rand_x){
    this.htmlElem.style.top = "0px";
    this.y = 0;
    this.htmlElem.style.left = rand_x+"px";
    this.x = rand_x;
  }
}
/**
 * Controls the program flow: creates the monsters and flakes and
 * monitors their progress.
 * @type type
 */
class MainControl{
  constructor(){
	  this.level = 1;

    // Monsters and snowflakes:
    this.timer = "";
    this.monsters = [];
    this.snowFlakes = [];
    this.gameOver = false;
    this.createMonsters(1);
    this.createFlakes(1);
    this.letItSnow();
  }
  /**
   * Creates number new monsters and adds them to the monsters array.
   * @param int number
   * @returns {undefined}
   */
  createMonsters(number){
    // Random x value for the "new" flake:
    let random_x = 0;
    for(let i=0; i<number; i++){
      random_x = Math.floor((Math.random() * getWindowWidth()));
      let id = "snowEater"+(this.monsters.length+1);  // Should be unique
      let monster = new SnowEater(random_x,groundLevelMonster,id,monsterImageSrc);
      this.monsters.push(monster);
    }
  }
  /**
   * Creates number new snow flakes and adds them to the monsters array.
   * @param {type} number
   * @returns {undefined}
   */
  createFlakes(number){
    // Random x value for the "new" flake:
    let random_x = 0;
    let random_y = 0;
    for(let i=0; i<number; i++){
      random_x = Math.floor((Math.random() * getWindowWidth()));
      random_y = -Math.floor((Math.random() * getWindowHeight()));
      let id = "snowFlake"+(this.snowFlakes.length+1);  // Should be unique
      let flake = new SnowFlake(random_x,random_y,id,flakeImageSrc);
      this.snowFlakes.push(flake);
    }
  }

  /**
   * Manages the movements of the snowflakes.
   * @returns {undefined}
   */
  letItSnow(){

    let i, j, flakeElem, flake;
    let fallingStep = snowFallSpeed;

    for(i=0; i < this.snowFlakes.length; i++){
      flake = this.snowFlakes[i];
      flakeElem = find(flake.id);

      if(flakeElem){
        flake.makeStep("down", fallingStep);

        // Checks all the monsters and their mouths:
        for(j=0; j<this.monsters.length; j++){
          let monster = this.monsters[j];
          let monsterMouthLeft = monster.x+10;	// Left part of mouth.
          let monsterMouthRight = monster.x+130;	// Right part of mouth.
          let monsterMouthLevel = monster.y;

          // Random x value for the "new" flake:
          let random_x = Math.floor((Math.random() * getWindowWidth()));

          // Test first if flake is inside the mouth:
          if(flake.x > monsterMouthLeft &&
            flake.x < monsterMouthRight &&
            flake.y > monsterMouthLevel){

            // If the flake hits a mouth, it's sent back:
            flake.sendFlakeUp(random_x);

            // Add a point:
            this.addaPoint();

            // If the flake is got in the air, double points given:
            if(monster.y < groundLevelMonster){
              this.addaPoint();
            }

            // Make the monster swallow:
            monster.swallow();
          }
        }

        // When the flake hits the groundLevel, it will be sent back up.
        if(flake.y > groundLevel){
          let random_x = Math.floor((Math.random() * getWindowWidth()));
          flake.sendFlakeUp(random_x);
          this.changeNumberOfLives(-1);
        }
      }
    }

    // Repeat by requestAnimationFrame:
    if(this.gameOver){
      alert("Game Over!");
    }
    else{
      // Heard: this not ideal because you're repeatedly calling .bind and creating a
      // new function reference over and over, once per frame.
      requestAnimationFrame(this.letItSnow.bind(this));
    }
  }

  // Adds one to the points:
  addaPoint(){
    let currentAmount = parseInt(find("numbOfPoints").innerHTML);
    let newAmount = currentAmount+1;
    find("numbOfPoints").innerHTML = newAmount;
  	if(newAmount % 10 === 0){
  	  this.addLevel();
  	}
  }

  // Adds one to the points:
  changeNumberOfLives(number){
    let currentAmount = parseInt(find("numbOfLives").innerHTML);
    let newAmount = currentAmount+number;
    if(newAmount >= 0){
      find("numbOfLives").innerHTML = newAmount;
    }
    if(newAmount === 0){
      this.gameOver = true;
    }
  }

  // Moves all the monsters left or right at static speed.
  startHorizontalMovement(direction){
    for(let i = 0; i < this.monsters.length; i++){
      let monster = this.monsters[i];
      let index = 0;
      let step = 0;
      let start_allowed = false;

      // If already moving in the same direction, nothing is done.
      if(direction === "left"){
        if(monster.isMovingLeft === false){
          start_allowed = true;
          monster.isMovingLeft = true;
          monster.isMovingRight = false;
        }
      } else if(direction === "right"){
        if(monster.isMovingRight === false){
          start_allowed = true;
          monster.isMovingLeft = false;
          monster.isMovingRight = true;
        }
      }

      if(start_allowed){
        monster.stop = false;
        let go = function(){
          step = monsterSpeed;
          monster.makeStep(direction, step);
          if(!monster.stop){
            requestAnimationFrame(go);
          }
        };
        //requestAnimationFrame(jump); // This works, was in the model.
        go(); // Works this way too (more intuitive)
      }
    }
  }

  // Stops the horiz movement of all the monsters.
  stopHorizontalMovement(direction){
    for(let i = 0; i < this.monsters.length; i++){
      let monster = this.monsters[i];

      // Only stop the movement to the right direction (In principle this
      // way a better user experience when pressing keys at the same time).
      // In practice no difference.
      if((direction === "right" && monster.isMovingRight) ||
        (direction === "left" && monster.isMovingLeft)){

        monster.stop = true;
        monster.isMovingLeft = false;
        monster.isMovingRight = false;
      }
    }
  }

  // Makes all the monsters jump in unison.
  makeMonstersJump(){
    const maxIndex = Math.round(getWindowHeight()/15);
    for(let i = 0; i < this.monsters.length; i++){
      let monster = this.monsters[i];
      let index = 0;
      let step = 0;

      let jump = function(){
        // quadratic function: motion fast first but slowing down towards the end.
        // After that it falls back down (step < 0).
        step = monsterSpeed-
            ((monsterSpeed/(maxIndex*maxIndex))*index*index);

        // Going up:
        if(step >= 0){
          monster.makeStep("up", step);
          requestAnimationFrame(jump);
        }
        // Falling down:
        else if(step < 0){
          if(monster.y-step < groundLevelMonster){
            monster.makeStep("up", step);
            requestAnimationFrame(jump);
          } else{
            step = groundLevelMonster - monster.y;
            monster.makeStep("down", step);
          }
        }
        index++;
      };
      //requestAnimationFrame(jump); // This works, was in the model.
      jump(); // Works this way too (more intuitive)
    }
  }

  // Changes the level of difficulty:
  addLevel(){
  	this.level++;
  	let soManyMore = this.level*2;
    this.createFlakes(soManyMore);
  	if(this.level < 5){
  	  this.createMonsters(1);
  	}
  }
  gameOver(){
    this.gameOver = true;
  }
}

// Starts the snowing. Is called in the beginning of body elem (onload).
function init(){
  main = new MainControl(); //
  main.changeNumberOfLives(10);
}

// Checks if the button was an left or right arrow and calls
// in that case the move methode:
function checkKey(e) {
  var key = e.which || e.keyCode;
  switch (key) {
    case 38: //up;
      main.makeMonstersJump();
    break;
  }
}

document.addEventListener('keydown', function (event) {
  var key = event.key || event.keyCode;
  switch (key) {
    case "ArrowLeft": //left;
      main.startHorizontalMovement("left");
    break;
    case "ArrowRight": //right;
      main.startHorizontalMovement("right");
    break;
  }
});
document.addEventListener('keyup', function (event) {
  var key = event.key || event.keyCode;
  switch (key) {
    case "ArrowLeft": //left;
      main.stopHorizontalMovement("left");
    break;
    case "ArrowRight": //right;
      main.stopHorizontalMovement("right");
    break;
  }
});




// Looks for and returns the element defined by id.
// If not found, returns false.
function find(id){
  let elem = document.getElementById(id);
  return elem;
}

// Help found in http://stackoverflow.com/questions/3437786/
// get-the-size-of-the-screen-current-web-page-and-browser-window
// Returns the height of the window:
function getWindowHeight(){

  var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  return height;
}
// Returns the width of the window:
function getWindowWidth(){
  var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

  return width;
}
