// Shows the selected files for image upload.
function showSelectedFiles(id_comment) {
    var input = document.getElementById("file_button_"+id_comment);
    var output = document.getElementById("selections_"+id_comment);

    output.innerHTML = "";
    for (var i = 0; i < input.files.length; ++i) {
        output.innerHTML += input.files.item(i).name;
    }
}

function saveImage(id_comment){
    showSelectedFiles(id_comment);
    document.getElementById("save_button_"+id_comment).click();
}
