window.onload = function() {

		$('.js-add-photo-btn').addEventListener('click',function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		},false);

		$('.js-edit-btn').addEventListener('click',function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		},false);
}