'use strict';
var keyCode = 0;

function updateCurp(){
  var firstName = extractData("firstName");
  var secondName = extractData("secondName");

  var separator = " ";
  var secondNameDivided = secondName.split(separator);

  console.log('internalFirstName: ' + secondNameDivided[1]);

  if(firstName && (secondNameDivided[0] && secondNameDivided[1])){ //Check if the Strings have values
    let firstPartOfInfo = secondNameDivided[0].charAt(0) + //first LETTER of the first Second Name
                          secondNameDivided[0].slice(1).match(/[aeiou]/gi)[0] + //first -INTERNAL- VOWEL of the first Second Name
                          secondNameDivided[1].charAt(0) + //first LETTER of the second Second Name
                          firstName.charAt(0); //first LETTER of the First Name

    let secondPartOfInfo =  secondNameDivided[0].slice(1).match(/[qwrtypsdfghjklñzxcvbnm]/gi)[0]  +
                            secondNameDivided[1].slice(1).match(/[qwrtypsdfghjklñzxcvbnm]/gi)[0]  +
                            firstName.slice(1).match(/[qwrtypsdfghjklñzxcvbnm]/gi)[0];

    document.getElementById("curp1").value = removeAccents(firstPartOfInfo);
    document.getElementById("rfc1").value = removeAccents(firstPartOfInfo);
    document.getElementById("curp5").value = removeAccents(secondPartOfInfo);
  }
}

function showPayStatement(statementType){
  let type = document.getElementById(statementType).value;
  if(type === "NONE")
      document.getElementById("valueOfstatementType").style.display = "none";
  else
    document.getElementById("valueOfstatementType").style.display = "block";
}

function validateCharacters(elementID,nextElementID,limit){
  convertCharacters(elementID);
  characterLimit(elementID,nextElementID,limit);
}

function updateRFC(elementIDCurp,elementIDRFC,elementIDIMSS){
  let numberCurp = extractData(elementIDCurp);
  document.getElementById(elementIDRFC).value = numberCurp;
  if(numberCurp[0] && numberCurp[1])
    document.getElementById(elementIDIMSS).value = numberCurp[0] + numberCurp[1];
  else
    document.getElementById(elementIDIMSS).value = "";
}

function onlyNumbers(e){
	let key = window.Event ? e.which : e.keyCode;
	return ((key >= 48 && key <= 57) || (key==8));
}

function onlyCharacters(e){
  let key = window.Event ? e.which : e.keyCode;
  return ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key==8));
}

function onlySpecificCharacters(e,character1,character2, character3, character4){
  let key = window.Event ? e.which : e.keyCode;
  return ((key === character1.charCodeAt(0) || key === character2.charCodeAt(0) || key === character3.charCodeAt(0) || key === character4.charCodeAt(0) || (key==8)));
}

function convertCharacters(elementID){
  let string = document.getElementById(elementID).value;
  document.getElementById(elementID).value = string.toUpperCase();
}

function characterLimit(elementID,nextElementID,limit){
  let string = document.getElementById(elementID).value;
  if(string.length >= limit ){
      string = string.slice(0,limit);
      document.getElementById(elementID).value = string;
      document.getElementById(nextElementID).focus();
  }
}

function checkCursorPosition(elementID){
  var textElement = document.getElementById(elementID);
  var startPosition = textElement.selectionStart;

  return startPosition;
}

function removeAccents(string){
	const accents = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return string.split('').map( letter => accents[letter] || letter).join('').toString().toUpperCase();
}

function extractData(dataID){
  var info = document.getElementById(dataID).value;
  return info;
}

validatePhoneNumber();

function validatePhoneNumber(){
  var numbers = document.getElementById('phoneNumber');
  numbers.onkeydown = function(e){
  	if (e.key == 'Backspace') return true;
  	if (e.key == 'ArrowLeft') return true;
  	if (e.key == 'ArrowRight') return true;
  	if (e.key == ' ') return false;
  };
  numbers.onkeyup = function(){
  	numbers.value = numbers.value
  					// Borrar todos los espacios
  					.replace(/\s/g, '')
  					// Agregar un espacio cada dos numeros
  					.replace(/([0-9]{2})/g, '$1 ')
  					// Borrar espacio al final
  					.trim();
  };
}
