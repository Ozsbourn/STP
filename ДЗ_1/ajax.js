document.addEventListener("DOMContentLoaded", function(event){
	updateForm();
});

function updateForm(){
	response = fetch('./brands.dat').then(function(response) {
		return response.text();
	}).then((data) => {
		let tmp = data.split('\n');

		let select = document.getElementById("brands_select");
		if (tmp.length < select.length) {
			select.length = tmp.length;
		}

		let doc;
		let addDiv = document.querySelector("brands_select");
		for (let i = 0; i < tmp.length; i++) {
			if ((doc = document.getElementById("br_val_" + i)) != null) {
				doc.innerHTML = tmp[i];
			} else {
				let el = select.appendChild(document.createElement('option'));
				el.innerHTML = tmp[i];
			}
		}

		for (let i = select.options.length - 1; select.options.length > tmp.length; i--) {
			select.removeChild(select.options[i]);
		}
	})
}