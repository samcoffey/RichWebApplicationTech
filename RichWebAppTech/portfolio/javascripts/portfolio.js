/*
 * Title: Portfolio - JavaScript
 * Author: Samuel Coffey - C11749921
 * Date: 29th October 2014
 * Description: This script contains JavaScript functions for my portfolio web application.
 */

//Function to show skills details when show link is clicked
function show_skills(div) {
	var show_link = div.getElementsByClassName("show")[0];
	show_link.style.display = "none";
	var hide_link = div.getElementsByClassName("hide")[0];
	hide_link.style.display = "inline";
	var skills = div.getElementsByClassName("skills_list")[0];
	skills.style.display = "block";
}

// Function to hide skills details when hide link is clicked
function hide_skills(div) {
	var hide_link = div.getElementsByClassName("hide")[0];
	hide_link.style.display = "none";
	var show_link = div.getElementsByClassName("show")[0];
	show_link.style.display = "inline";
	var skills = div.getElementsByClassName("skills_list")[0];
	skills.style.display = "none";
}