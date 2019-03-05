/**
  This class has all the methods for showing function features like code, name
  or return value.
*/
class FunctionShow {
  constructor(funcArray){

    // The parameter value can be anything but an array only is handled. In any
    // case the funcArray parameter will be an array.
    if(Array.isArray(funcArray)){
      this.funcArray = funcArray;
    } else{
      this.funcArray = [];
    }

    this.codeStyle =
      "background-color: #dfd; padding: 3px;line-height: 110%; color: brown;"+
      "font-size: 110%; font-weight: 500" ;
    this.btnStyle =
      "margin: 5px; display: block;";
    this.resStyle =
      "color: red;";
  }

  getFuncArray(){
    return this.funcArray;
  }
  setFuncArray(newArr){
    if(Array.isArray(newArr)){
      this.funcArray = newArr;
    }
  }

  /* Adds a new function to the collection.  */
  addFunction(newItem){
    if(newItem){
      this.funcArray.push(newItem);
    }
  }

  // Shows the return value of the function. Parameter number defines the function.
  showResult(number){
    var idValue = "result"+number;
    document.getElementById(idValue).innerHTML =
      "<h2 style='"+this.resStyle+"'>" +
        this.funcArray[number-1]() + "</h2>";
  }

  // Clears all the results.
  clearIt(){
    for (let i=0; i < this.funcArray.length; i++){
       document.getElementById("result"+(i+1)).innerHTML ="";
     }
  }

  // Creates the html code to show the buttons and source codes.
  createCodesAndButtons(){
    var html = "";
    var i, count, elemId;
    for (i=0; i<this.getFuncArray().length; i++){
       count = i+1;
       elemId = "code"+count;
       html += '<hr><h2>Function number '+count+' ('+this.funcArray[i].name+'):</h2>'+
                this.showSourceCode(this.funcArray[i], elemId)+
                '<button style="'+this.btnStyle+'" onclick="fShow.showResult('+count+')">'+
                   'Show result of function '+this.funcArray[i].name+
                '</button>'+
                '<div id="result'+count+'"></div>';
    }
    document.getElementById("content").innerHTML = html;
  }

  // Returns html with the source code embedded (encoded for special chars):
  showSourceCode(func, elemId){
    var code =
      '<pre class="codePlace" style="'+this.codeStyle+'"><code id="'+elemId+'">'+
        func.toString().replace(/</g, "&lt;")+
      '</code></pre>';
    return code;
  }

}
