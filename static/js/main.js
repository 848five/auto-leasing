//load typekit
try{Typekit.load();}catch(e){};

function GA() {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-53427102-1', 'auto');
	ga('require', 'displayfeatures');
	ga('send', 'pageview');
}


function loadBigVideo() {
	var video = document.querySelector('#myVideo');
	video.style.marginLeft = -(video.offsetWidth / 2) + 'px';
	video.play();
	setTimeout(function() {
		$('video').fadeOut(2000);
	},9000);
}
window.addEventListener('load',function() {
	GA();
	loadBigVideo();
});