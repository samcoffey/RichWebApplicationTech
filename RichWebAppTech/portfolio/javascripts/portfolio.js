function show_skills(div) {
	var show_link = div.getElementsByClassName("show")[0];
	show_link.style.display="none";
	var hide_link = div.getElementsByClassName("hide")[0];
	hide_link.style.display="inline";
	var skills = div.getElementsByClassName("skills_list")[0];
	skills.style.display="block";
}

function hide_skills(div) {
	var hide_link = div.getElementsByClassName("hide")[0];
	hide_link.style.display="none";
	var show_link = div.getElementsByClassName("show")[0];
	show_link.style.display="inline";
	var skills = div.getElementsByClassName("skills_list")[0];
	skills.style.display="none";
}