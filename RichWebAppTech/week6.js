function hide() {
	var e = document.getElementsByTagName('section');
	var i;
	if(!e)return true;
	
	for (i = 0; i < e.length; i++) {
		if(e[i].style.display=="none") {
			e[i].style.display="block"
		}
		else {
			e[i].style.display="none"
		}
	}
	return true;
}

function emphasise() {
	bolidfy(document.getElementsByTagName('body')[0], 'defeasible');
}

function bolidfy(container, str) {
	container.innerHTML = container.innerHTML.replace(new RegExp('(^|)(' + str
			+ ')(|$)', 'ig'), '<span style="color:yellow;">$1<b>$2</b>$3</span>');
}

function a_remove() {
	var e = document.getElementsByTagName("a");
	var i;
	console.log(e);
	//if(!e)return true;
	for(i = e.length - 1; i >= 0; i--) {
		//var item = e[i];
		e[i].remove();
	}
	//return true;
}

