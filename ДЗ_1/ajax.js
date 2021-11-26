function updateForm(){
	response = fetch('./brands.dat').then(function(response) {
		return response.text();
	}).then((data) => {
		let tmp = data.split('\n');

		let addDiv = document.getElementById("br_add");
		for (let i = 0; i < tmp.length; i++) {
			if (document.getElementById("br_val_" + i) != null) {
				document.getElementById("br_val_" + i).innerHTML = tmp[i];
			} else {
				addDiv.insertAdjacentHTML('afterend',
					'<option id="br_val_' + i + '">' + tmp[i] + '</option>');
			}
		}
	})
}