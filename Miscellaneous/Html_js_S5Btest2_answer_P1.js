
function makeSquare(size, color){

	// Creates a new div element:
	var div = document.createElement("div");
	div.style.display = "inline-block";
	div.style.height = size+"px";
	div.style.width = size+"px";
	div.style.margin="5px";
	div.style.backgroundColor=color;
	document.body.appendChild(div);
}
alert(makeSquare(34, "green"));
