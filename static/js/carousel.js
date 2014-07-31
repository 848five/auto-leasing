function loadCarousel() {

	carousel = new IScroll('#scroller', { scrollX: true, scrollY: false, mouseWheel: true, snap: true});
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	document.querySelector('.js-carousel-left').onclick = function() {
		carousel.prev();
		updatePages();

	}
	document.querySelector('.js-carousel-right').onclick = function() {
		carousel.next();
		updatePages();
	}

}


function updatePages() {
	var galleryItems = document.querySelectorAll('#indicator ul li');
	for (var i = 0; i <= galleryItems.length -1; i++) {
		galleryItems[i].className = "";
		if (i == carousel.currentPage.pageX ) {
			galleryItems[i].className = "active";
		}

		if (carousel.currentPage.pageX == galleryItems.length -1) {
			document.querySelector('.js-carousel-right').style.opacity = 0.1;
		}
		if (carousel.currentPage.pageX == 0) {
			document.querySelector('.js-carousel-left').style.opacity = 0.1;
		} else {
			document.querySelector('.js-carousel-left').style.opacity = 1;
		}
	};


}

window.addEventListener('load',loadCarousel);
