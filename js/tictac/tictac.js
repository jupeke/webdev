const BOARD_SIZE = 10;
const EMPTY = "";
const UNKNOWN = "outo";
var board = UNKNOWN;

class Board{
  constructor(){
    this.table = this.initiate(BOARD_SIZE,BOARD_SIZE);
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
  // Returns the value of table element at (x,y), an object of Cell class.
  get(x,y){
    let value = UNKNOWN;
    if(x > this.get_cols() || y > this.get_rows()){
        alert("Value too big for the table ("+x+","+y+")!");
    } else{
        cell = this.table[y-1][x-1];
        value = cell.value;
    }
    return value;
  }

  // Initate array with the right sizes and empty cells:
  initiate(cols,rows){
    //alert("(cols,rows)=("+this.cols+","+this.rows+")");
    let table = new Array(rows);
    for(let i = 0; i < table.length; i++){
        table[i] = new Array(cols);
        for(let k=0; k < cols; k++){
            table[i][k] = new Cell(k,i); // Note the order.
        }
    }
    return table;
  }
  
  show(){
    document.querySelector("#board").appendChild(this.createBoard);
  }

  tick(x,y){
    alert(x+","+y);
  }
  // Enough to check 4 cells all directions
  checkSituation(x,y){
    return true;
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
        let cell = this.get(k,i);
        let id = document.createAttribute("id");
        id.value = cell.id;
        c.setAttribute(id);
        
        c.addEventListener("click", function(){
          tick(cell.id);
          checkSituation(cell.x, cell.y);
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
    this.value = "";
    this.id = "cell_"+x+y;
  }
}

function init(){
  board = new Board();
  board.show();
}