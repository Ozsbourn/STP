document.addEventListener("DOMContentLoaded", function(event){
	response = fetch('./brands.dat').then(function(response) {
		return response.text();
	}).then((data) => {
		let tmp = data.split('\n');

		let select = document.getElementById("brands_select");
		if (tmp.length < select.length) {
			select.length = tmp.length;
			console.log("123");
		}

		let doc;
		let addDiv = document.querySelector("brands_select");
		for (let i = 0; i < tmp.length; i++) {
			if ((doc = document.getElementById("br_val_" + i)) != null) {
				doc.innerHTML = tmp[i];
			} else {
				select.appendChild(document.createElement("option"), select.firstChild)
				select.options[i].text = tmp[i];
			}
		}
	 })
});