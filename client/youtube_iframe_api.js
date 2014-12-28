if (!window['YT']) {
	YT = {
		loading: 0,
		loaded: 1
	};
}

if (!window['YTConfig']) {
	YTConfig = {
		host: 'https://www.youtube.com'
	};
}

YT.load = function() {
	if (!YT.loading) {
		YT.loading = 1;
		(function() {
			var l = [];
			YT.ready = function(f) {
				if (YT.loaded) {
					f();
				} else {
					l.push(f);
				}
			};

			window.onYTReady = function() {
				YT.loaded = 1;
				for (var i=0; i<l.length; i++) {
					try {
						l[i]();
					} catch (e) {
						console.log(e)
					}
				}
				YT.loading = 0;
			};

			YT.setConfig = function(c) {
				for (var k in c) {
					if (c.hasOwnProperty(k)) {
						YTconfig[k] = c[k];
					}
				}
			};
			document.addEventListener('DOMContentLoaded', function() {
				var a = document.createElement('script');
				a.id = 'www.widegetapi-script';
				a.src = 'https:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vfldTtH0_/www-widgetapi.js';
				document.getElementsByTagName('head')[0].appendChild(a);
			});
		})();
	}
}
console.log('heee');
onYouTubeIframeAPIReady = function() {
	var player = new YT.Player("youtube-player", {
		height: "400",
		width: "600",
		videoId: 'LdH1hSWGFGU',
		events: {
			onReady: function(event) {
				event.target.playVideo();
			}
		}
	});
};
YT.load();
