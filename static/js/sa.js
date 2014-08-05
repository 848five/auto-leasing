window.onload = function() {

		$('.js-add-photo-btn').click(function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		});

		$('.js-edit-btn').click(function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		});
}