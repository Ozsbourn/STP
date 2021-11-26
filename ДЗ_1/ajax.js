function updateForm(){
	response = fetch('./brands.dat').then(function(response) {
		return response.text();
	}).then((data) => {
		var tmp1 = "";
		for (let i = 0; i < 12; i++)
			tmp1 += data[i];
		document.getElementById("br_val_0").innerHTML = tmp1;

		var tmp2 = "";
		for (let i = 13; i < 28; i++)
			tmp2 += data[i];
		document.getElementById("br_val_1").innerHTML = tmp2;

		var tmp3 = "";
		for (let i = 28; i < 42; i++)
			tmp3 += data[i];
		document.getElementById("br_val_2").innerHTML = tmp3;
	})
}