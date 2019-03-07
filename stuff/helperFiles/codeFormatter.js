class CodeFormatter {
  constructor(code){
    this.code = code;

    this.keywordStyle = "color: blue";
    this.funcNameStyle ="weight: bold";

    this.keywords = [
      "function",
      "var",
      "for",
      "return",
      "this",
      "if",
      "else"
    ]
  }

  getCode(){
    return this.code;
  }
  setCode(newCode){
    if(newCode){
      this.code = newCode;
    }
  }

  // Colors keywords etc to make code nicer. Returns the result html.
  format(codeBlock){
    let formattedCode = codeBlock.replace(/</g, "&lt;");

    for(let i=0; i < this.keywords.length; i++){

      let keyword = this.keywords[i];
      var regExp = new RegExp(keyword,"g");  // This way variable works.

      formattedCode = formattedCode.replace(regExp,
        "<span style='"+this.keywordStyle+"'>"+keyword+"</span>");
    }
    return formattedCode;
  }

  getSubstring(){
    test.match(new RegExp(firstvariable + "(.*)" + secondvariable));
  }
}
