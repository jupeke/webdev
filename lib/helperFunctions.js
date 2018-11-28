/**
 * This is a shortcut command for document.getElementById(id) and returns
 * the return value of document.getElementById(id).
 * @param string id
 * @returns {undefined}
 */
function find(id){
    return document.getElementById(id);
}

/**
 * Appends the content given as parameter to the element,
 * whose id is given as parameter. Work both for .innerHTML
 * and .value elements (see 3rd param). If element is
 * not found, does nothing.
 * @param string id
 * @param string content The content to be appended
 * @param bool isValue If true, the elem is an input field or
 * similar. Otherwise uses .innerHTML to append.
 * @returns {undefined}
 */
function append(id, content, isValue){
  var elem = document.getElementById(id);
  var oldContent = "";

  if(elem){
    if(isValue){
      oldContent = elem.value;
      elem.value = oldContent+content;
    } else{
      oldContent = elem.innerHTML;
      elem.innerHTML = oldContent+content;
    }
  }
}

/**
 * Submits the form defined by its unique id value.
 * @param int id
 * @returns {undefined}
 */
function submitForm(id){
  var formi = f(id);
  if(formi){
      formi.submit();
  } else{
      alert("Form with id="+id+" is not found");
  }
}

/**
 * Adds an element to an array before index given as parameter. If
 * parameter >= array.length, adds en element to the end of array.
 * Returns the result array.
 *
 * Note: remember that a nodeList doesn't work here because it's
 * immutable.
 * Note this, too: elem.insertBefore(newItem, elem.childNodes[i]);
 * */
function addElemBefore(index_raw, elem, targetArray){

  var index = Number(index_raw);

  if(index >= targetArray.length || index < 0){
      targetArray.push(elem);
  } else{
      targetArray.splice(index, 0, elem);
      //alert("Funktio addElemBefore: "+targetArray.length+" elems in array");
  }
  return targetArray;
}
