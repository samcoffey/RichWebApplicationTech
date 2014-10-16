function getCelsius() {
	var cfield = document.getElementById("celsius");
	var fvalue = document.forms["myForm"]["fahrenheit"].value;
    if (isNaN(fvalue)) 
    {
        alert("Must input numbers");
        return false;
    }
    
    var cAnswer = fvalue * 9 / 5 + 32;
    cfield.value = cAnswer;
}

function getFahrenheit() {
	var ffield = document.getElementById("fahrenheit");
	var cvalue = document.forms["myForm"]["celsius"].value;
    if (isNaN(cvalue)) 
    {
        alert("Must input numbers");
        return false;
    }
    
    var fAnswer = (cvalue - 32) * 5 / 9;
    ffield.value = fAnswer;
}