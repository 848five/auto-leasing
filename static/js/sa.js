window.onload = function() {

		$('.js-add-photo-btn').addEventListener('click',function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		},false);

	if ('.js-edit-btn') {
		$(editBtn).addEventListener('click',function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		},false);
	}
}