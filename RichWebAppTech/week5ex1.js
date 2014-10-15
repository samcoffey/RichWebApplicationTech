function validateForm() {
	var name = document.forms["myForm"]["name"].value;
	var checkbox = document.forms["myForm"]["terms_and_conditions"];
	var ageval = document.forms["myForm"]["agelist"].value;
	var acceptableAges = [ "0-18", "18-30", "30-45", "45-60", "60+" ];
	var radioBtn = document.forms["myForm"]["gender"];
	var radioCheck = -1;

	for (var i = 0; i < radioBtn.length; i++) {
		if (radioBtn[i].checked) {
			radioCheck = i;
		}
	}

	if (name == null || name == "") {
		alert("Name must be filled out");
		document.getElementById("name").focus();
		return false;
	} else if (acceptableAges.indexOf(ageval) <= -1) {
		alert("You must select one of the age ranges");
		document.getElementById("agelist").focus();
		return false;
	} else if (radioCheck == -1) {
		alert("You must select male or female");
		return false;
	} else if (!checkbox.checked) {
		alert("You must accept the terms and conditions");
		document.getElementById("terms_and_conditions").focus();
		return false;
	} else {
		alert("Form completed successfully!");
		return true;
	}
}
