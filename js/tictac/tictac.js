const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 10;
const EMPTY = "";
const UNKNOWN = "outo";
const VAL_X = "value_x";
const VAL_O = "value_o";
var board = UNKNOWN;
var winningLen = 5;  //Default.
var turn = VAL_X; // Who is ticking

class Board{
  constructor(){
    this.table = this.initiate(BOARD_WIDTH,BOARD_HEIGHT);
  }

  get_cols(){
    return this.table[0].length;
  }
  get_rows(){
    return this.table.length;
  }

  // Set value to the cell at (x,y). Value x refers to col (width),
  // y to row (height) like in the coordinates system. Note:
  // x and y begin at 1. Cell (1,1) is the top left one (like in a
  // spread sheet program).
  // Return True if success, otherwise False. 
  set(value, x, y){
    let success = false;
    if(x > this.get_cols() || y > this.get_rows()){
        alert("Value too big for the table ("+x+","+y+")!");
    } else{
        this.table[y-1][x-1].value = value;
        success = true;
    }
    return success;
  }
  // Returns the value of cell at (x,y), a string. If not found,
  // return UNKNOWN.
  get(x,y){
    let value = UNKNOWN;
    let cell = this.get_cell(x,y);
    if (cell !== UNKNOWN){
      value = cell.value;
    }
    return value;
  }

  // Returns the cell object at (x,y), an object of Cell class.
  // If not found (bad value x or y), returns the value false.
  get_cell(x,y){
    let cell = false;
    if(x >= 1 && x <= this.get_cols() && y >= 1 && y <= this.get_rows()){
      cell = this.table[y-1][x-1];
    }
    return cell;
  }
  // Return the adjacent cell in the given direction or false 
  // if not possible. Take as parameters the current cell and
  // a direction (dir) in form "E"/"S"/"NE"/"SE" corresponding
  // east/south/northeast/southeast. 
  getNextCell(cell, dir){
    let result = false;
    if(dir === "E"){  
      result = this.get_cell(cell.x+1, cell.y)
    } 
    else if(dir === "S"){
      result = this.get_cell(cell.x, cell.y+1)
    } 
    else if(dir === "NE"){
      result = this.get_cell(cell.x+1, cell.y-1)
    } 
    else if(dir === "SE"){ 
      result = this.get_cell(cell.x+1, cell.y+1)
    }
    return result;
  }

  // Initate array with the right sizes and empty cells:
  initiate(cols,rows){
    //alert("(cols,rows)=("+this.cols+","+this.rows+")");
    let table = new Array(rows);
    for(let i = 0; i < table.length; i++){
        table[i] = new Array(cols);
        for(let k=0; k < cols; k++){
            table[i][k] = new Cell(k+1,i+1); // Note the order.
        }
    }
    return table;
  }
  
  show(){
    document.querySelector("#board").appendChild(this.createBoard());
  }

  tick(cell){
    if (turn === VAL_O){
      cell.setValue(VAL_O);
    } else{
      cell.setValue(VAL_X);
    }
    cell.showValue();
  }
  // Enough to check 4 cells to all 8 directions from the
  // tick. Means 4 times a 9 cell vector that is to be checked.
  // Return either true if winner found or false otherwise.
  checkIfFinished(cell){
    let finished = false;
    let valueToCheck = cell.value;
    let startCellDirs = ["horizontal", "vertical", "uphill", "downhill"];
    let nextCellDirs = ["E", "S", "NE", "SE"];

    for(let k = 0; k < startCellDirs.length; k++){
      let counter = 0;
      let currCell = this.getStartCellForCheck(startCellDirs[k], cell);

      for(var i = 1; i <= (2*winningLen-1); i++){
        if(currCell.value === valueToCheck){
          counter++;
        } else{
          counter = 0;
        }
        if(counter === winningLen){
          finished = true;
          break;
        } 
        else{
          currCell = this.getNextCell(currCell,nextCellDirs[k]);

          // If currCell is au bord du goufre, stop:
          if(currCell === false){
            break;
          } 
        }
      }
    }
    return finished;
  }
  // Returns the cell that starts the search vector. The
  // direction and the ticked cell given as parameters.
  getStartCellForCheck(dir,currCell){
    if (dir === "vertical"){
      x = currCell.x;
      y = Math.max(currCell.y-(winningLen-1),1);
    } else if (dir === "horizontal"){
      x = Math.max(currCell.x-(winningLen-1),1);
      y = currCell.y;
    } else if (dir === "uphill"){ // Start point bottom left
      let x = currCell.x;
      let y = currCell.y;
      for(let i = 1; i < (winningLen-1);i++){
        if(x-1 >= 1 && y+1 <= BOARD_HEIGHT){
          x--;
          y++;
        } else{
          break;  // The board side reached.
        }
      }
    } else if (dir === "downhill"){ // Start point top left
      let x = currCell.x;
      let y = currCell.y;
      for(let i = 1; i < (winningLen-1);i++){
        if(x-1 >= 1 && y-1 >= 1){
          x--;
          y--;
        } else{
          break;  // The board side reached.
        }
      }
    } else{ // If no direction given -> the cell itself returned.
      x = currCell.x;
      y = currCell.y;
    }
    return this.get_cell(x,y);
  }

  // Create an HTML presentation of the board. Return a DOM object.
  createBoard(){
    const table = document.createElement("table");
  
    // Rows:
    for(let i = 1; i <= this.get_rows(); i++){
      let row = table.insertRow(-1);  // Inserts at the last position

      // a Row:
      for(let k = 1; k <= this.get_cols(); k++){
        let c = row.insertCell(-1); // At the last position
        let cell = this.get_cell(k,i);
        
        c.setAttribute("id",cell.id);

        // So called "arrow function" preserves the scope for 'this'
        c.addEventListener("click", ()=>{ 
          this.tick(cell);
          if(this.checkIfFinished(cell)){
            alert("Winner found!");
          }
        });
      } 
    }
    return table;
  }
}

class Cell{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.value = EMPTY;
    this.id = "cell_"+x+y;
  }
  showValue(){
    let elem = document.getElementById(this.id);
    elem.setAttribute("class",this.value);
  }
  // Possible only once. If set, does nothing.
  setValue(value){
    if(this.value === EMPTY){
      if(value === VAL_O){
        this.value = VAL_O;
        turn = VAL_X;
      } else{
        this.value = VAL_X;
        turn = VAL_O;
      }
    }
  }
}

function init(){
  board = new Board();
  board.show();
}
