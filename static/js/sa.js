window.onload = function() {

		$('.js-add-photo-btn').click(function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		});

		$('.js-remove-photo').click(function(e) {
			e.preventDefault();
			if (confirm('Are you sure you want to remove this photo?')) {
				var id = $(this).parent().parent().parent().attr('data-id');
				var photo = $(this).next().attr('src');
			    removePhoto(id,this);
			} else {
			}
		});

		$('.js-edit-btn').click(function(e) {
			e.preventDefault();
			alert($(this).attr('data-item'));
		});
}


function removePhoto(id,photo) {
	console.log("id:->" + id);
	console.log("photo:->" + photo);
}


/*
$.ajax({
    url: 'http://www.blissautoleasing.com/dashboard/view/photo/specials/53e1ad2edfbea44b651fdb4c',
    type: 'DELETE',
    data: {'photo':'test.jpg'},
    success: function(result) {
        console.log(result);
    }
});
*/