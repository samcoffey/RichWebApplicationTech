/*
 * Title: Portfolio - JavaScript
 * Author: Samuel Coffey - C11749921
 * Date: 29th October 2014
 * Description: This script contains JavaScript functions for my portfolio web application.
 */

//Function to show skills details when show link is clicked
function show_skills(div) {
	/*There will be only one element with class name "show" in the div so we use element 0*/
	var show_link = div.getElementsByClassName("show")[0];
	show_link.style.display = "none";
	/*There will be only one element with class name "hide" in the div so we use element 0*/
	var hide_link = div.getElementsByClassName("hide")[0];
	hide_link.style.display = "inline";
	/*There will be only one element with class name "skills_list" in the div so we use element 0*/
	var skills = div.getElementsByClassName("skills_list")[0];
	skills.style.display = "block";
}

// Function to hide skills details when hide link is clicked
function hide_skills(div) {
	/*There will be only one element with class name "hide" in the div so we use element 0*/
	var hide_link = div.getElementsByClassName("hide")[0];
	hide_link.style.display = "none";
	/*There will be only one element with class name "show" in the div so we use element 0*/
	var show_link = div.getElementsByClassName("show")[0];
	show_link.style.display = "inline";
	/*There will be only one element with class name "skills_list" in the div so we use element 0*/
	var skills = div.getElementsByClassName("skills_list")[0];
	skills.style.display = "none";
}

//Function to change the background colour when c_link link is clicked
function change_background(new_colour) {
	/*The new background colour is passed to the function from the html page*/
	document.body.style.background = new_colour;
}