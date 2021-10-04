var i = 0;

function Shift(value){
	if (value == 0) {
		picture.style = "margin: 0px auto 0px 0px";
	} else if (value == 2) {
		picture.style = "margin: 0px 0px 0px auto";
	} else {
		picture.style = "margin: 0px auto 0px auto";
	}
};