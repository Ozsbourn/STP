document.addEventListener("DOMContentLoaded", function(event){
	response = fetch('./brands.dat').then(function(response) {
		return response.text();
	}).then((data) => {
		let tmp = data.split('\n');

		let doc, i;
		let addDiv = document.getElementById("br_add");
		for (i = 0; i < tmp.length; i++) {
			if ((doc = document.getElementById("br_val_" + i)) != null) {
				doc.innerHTML = tmp[i];
			} else {
				addDiv.insertAdjacentHTML('afterBegin', '<option id="br_val_added">' + tmp[i] + '</option>');
			}
		}
	})
});