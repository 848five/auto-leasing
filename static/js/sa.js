window.onload = function() {
	var addPhotoBtn = document.querySelector('.js-add-photo-btn');
	var editBtn = document.querySelector('.js-edit-btn');

	if (addPhotoBtn) {
		$(addPhotoBtn).addEventListener('click',function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		},false);
	}

	if (editBtn) {
		$(editBtn).addEventListener('click',function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		},false);
	}
}