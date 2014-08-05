window.onload = function() {

	if (addPhotoBtn = document.querySelector('.js-add-photo-btn')) {
		$(addPhotoBtn).addEventListener('click',function(e) {
			e.preventDefault();
			
		},false);
	}

	if (editBtn = document.querySelector('.js-edit-btn')) {
		$(editBtn).addEventListener('click',function(e) {
			e.preventDefault();

		},false);
	}
}