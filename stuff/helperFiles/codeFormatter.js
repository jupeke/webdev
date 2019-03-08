class CodeFormatter {
  constructor(){
    this.code = "";

    this.keywordStyle = "color: blue";
    this.funcNameStyle ="weight: bold";
    this.operatorStyle ="color: green";

    this.keywords = [
      "function",
      "var",
      "for",
      "return",
      "this",
      "if",
      "else"
    ];
    this.operators = [
      "+",
      "++",
      "=",
      "==",
      "===",
      "-",
      "--",
      "<",
      ">",
      "+=",
      "-=",
      ">=",
      "<="
    ];
  }

  getCode(){
    return this.code;
  }
  setCode(newCode){
    if(newCode){
      this.code = newCode;
    }
  }

  // Does all the formatting to the code. Colors keywords etc to make code nicer.
  // Returns the final html.
  format(codeBlock){
    let formattedCode = codeBlock.replace(/</g, "&lt;");
    formattedCode = formattedCode.replace(/>/g, "&gt;");

    formattedCode = this.formatKeywords(formattedCode);

    // After this the code contains a lot of html markup which makes
    // it more difficult to go on. Probably a different approuch needed.
    //formattedCode = this.formatOperators(formattedCode);

    return formattedCode;
  }

  // Does all the formatting to the code. Colors keywords etc to make code nicer.
  // Returns the final html.
  formatKeywords(codeBlock){
    let formattedCode = codeBlock;
    for(let i=0; i < this.keywords.length; i++){

      let keyword = this.keywords[i];
      let regExp = new RegExp(keyword,"g");  // This way variable works.

      formattedCode = formattedCode.replace(regExp,
        "<span style='"+this.keywordStyle+"'>"+keyword+"</span>");
    }

    return formattedCode;
  }

  // Formats JS operator like +-==<
  formatOperators(codeBlock){
    let formattedCode = codeBlock;
    for(let i=0; i < this.operators.length; i++){

      let operator = this.operators[i];
      let regExp = new RegExp(operator,"g");

      formattedCode = formattedCode.replace(regExp,
        "<span style='"+this.operatorStyle+"'>"+operator+"</span>");
    }
    return formattedCode;
  }

  getSubstring(){
    test.match(new RegExp(var1 + "(.*)" + var2));
  }
}

// Contains the atomic part of code and it's type
class codeBit(){
  constructor(codeStr, type){
    this.codeStr = codeStr;
    this.type = type;
  }

  
}
