// NOTE: some features in the code here are from ECMAScript 6 (ES6)
//(the newest JavaScript standard from 6/2015) and only work
// in browsers supporting it (practically the most modern
// browsers do but no version of IE, for instance).
// Examples of the new notation: class, constructor, const, let

// Global variables and constants:
const monsterSpeed = 40;	// Constant giving the speed to move the monster (ES6).
const snowFallSpeed = 10; // Constant giving the speed to flakes to fall.
const groundLevel = getWindowHeight()-100; // from the roof!
const monsterImageSrc = "images/snowEater.png";
const flakeImageSrc = "images/snowFlake.png";

var main = "";  // Instance of MainControl class

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
      if(direction === "right"){
        this.x = this.x+stepLen;
        elem.style.left=this.x+"px";
      }
      else if (direction === "left"){
        this.x = this.x-stepLen;
        elem.style.left=this.x+"px";
      }
      else if (direction === "up"){
        this.y = this.y-stepLen;
        elem.style.top=this.y+"px";
      }
      else if (direction === "down"){
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
    this.timer = "";
    this.monsters = [];
    this.createMonsters(1);
    this.snowFlakes = [];
    this.createFlakes(1);
    this.letItSnow();
  }
  /**
   * Creates number new monsters and adds them to the monsters array.
   * @param int number
   */
  createMonsters(number){
    // Random x value for the "new" flake:
    let random_x = 0;
    for(let i=0; i<number; i++){
      random_x = Math.floor((Math.random() * getWindowWidth()));
      let id = "snowEater"+(this.monsters.length+1);  // Should be unique
      let monster = new SnowEater(random_x,groundLevel-100,id,monsterImageSrc);
      this.monsters.push(monster);
    }
  }

  // Moves all the monsters to the wanted direction (on a click).
  moveMonsters(direction){
    const maxIndex = 15;
    for(let i = 0; i < this.monsters.length; i++){
      let monster = this.monsters[i];
      monster.makeStep(direction, monster.defaultStepLen);
    }
  }

  /**
   * Creates 'number' new snow flakes and adds them to the monsters array.
   * @param {type} number
   */
  createFlakes(number){
    // Random x value for the "new" flake:
    let random_x = 0;
    let random_y = 0;
    for(let i=0; i < number; i++){
      random_x = Math.floor((Math.random() * getWindowWidth()));
      random_y = -Math.floor((Math.random() * getWindowHeight()));
      let id = "snowFlake"+(this.snowFlakes.length+1);  // Should be unique
      let flake = new SnowFlake(random_x,random_y,id,flakeImageSrc);
      this.snowFlakes.push(flake);
    }
  }

 /**
   * Manages the movements of the snowflakes.
   */
  letItSnow(){
    let i, j, flakeElem, flake;
    let fallingStep = snowFallSpeed;
    for(i=0; i < this.snowFlakes.length; i++){
      flake = this.snowFlakes[i];
      flakeElem = find(flake.id);

      if(flakeElem){
        if(flake.y > getWindowHeight()-100){
          flake.y = 0;
        } else{
          flake.makeStep("down", fallingStep);
        }
      }
    }

    this.timer = setTimeout(() => {
      // I can access 'this' in here!
      this.letItSnow();
    }, 40);
  }
}

// Starts the snowing. Is called in the beginning of body elem (onload).
function init(){
  main = new MainControl(); //
}

// Checks if the button was an left or right arrow and calls
// in that case the move methode:
function checkKey(e) {
  var event = e.which || e.keyCode;
  switch (event) {
    case 37: //left;
      main.moveMonsters("left");
    break;
    case 38: //up;
      //main.moveMonsters("up");
    break;
    case 39: //right;
      main.moveMonsters("right");
    break;
    case 40: //down;
      //main.moveMonsters("down");
    break;
  }
}

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
