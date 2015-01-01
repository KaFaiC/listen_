Template.playlist.helpers({
	songs: function() {
		return this.songs
	}
});

Template.playlist.events({
	'submit .search-form': function(e) {
		e.preventDefault();
		console.log(e);
	}
});

Template.playlist.events({
	'submit .create-song-form': function(e) {
		e.preventDefault();
		var youtubeVideoId = $(e.target).find('[name=videoId]').val();
		
		var errors = validateSongId(youtubeVideoId);
		if(errors.youtubeVIdeoId)
			return Session.set('songSubmitErrors', errors);
		
		Meteor.call('songInsert', youtubeVideoId, function(err, result) {
			if (err)
				return throwError(err.reason);
			console.log(result);	
			if (result.songExists)
				return throwError('This song has already been added');
	
		});
	}
});

Meteor.startup(function() {
	Session.set('YTApiReady', false);
	Session.set('channelRendered', false);
});

onYoutubeIframeAPIReady = function() {
	console.log('heee');
	Session.set('YTApiReady', true);
};

Template.playlist.created = function() {
	if (typeof player === 'undefined')
		(function(d,t) {
			var g	= d.createElement(t),
					s = d.getElementsByTagName(t)[0];
			g.src = 'https://www.youtube.com/iframe_api';
			s.parentNode.insertBefore(g, s);
		}(document, 'script'));
};

Template.playlist.rendered = function() {
	Session.set('playlistRendered', true);
};

Template.playlist.destroyed = function() {
	Session.set('playlistRenderred', false);
};

Tracker.autorun(function() {
	if (Session.equals('YTApiReady', false) || Session.equals('playlistRendered', false)) {
		return;
	}
	var currentPlayingVideo;
	var interval = Meteor.setInterval(function() {
		if(!document.getElementById('youtube-player-wrapper')) {
			return;
		}
		console.log('in interval');
		var playerDiv = document.createElement('div'),
			//	playlist  = Template.playlist.getPlaylist(),
		playerWrapper = document.getElementById('youtube-player-wrapper');
		playerDiv.id  = 'player-div';		
		playerWrapper.innerHTML = '';
		playerWrapper.appendChild(playerDiv);
		
		player = null;
		currentPlayingVideo = getHighestVoteSong();
		player = new YT.Player('player-div', {
			currentPlayingVideoId: currentPlayingVideo._id,
			videoId: currentPlayingVideo.youtubeVideoId,
			events: {
				onReady: function(event) {
					event.target.playVideo();
				},
				onError: function(event) {
					throwError('We are sorry for the youtube error. Please try it later');
				},
				onStateChange: function(event) {
					if (event.data == YT.PlayerState.ENDED) {
						console.log(player);
						Meteor.call('clearVote', currentPlayingVideo._id, function(err, result) {
							if (err)
								throwError(error.reason);
							currentPlayingVideo = getHighestVoteSong();
							player.videoId = currentPlayingVideo.youtubeVideoId;
							player.loadVideoById(player.videoId);
						});
					};
					return false;
				}
		  }
		});
		Meteor.clearInterval(interval);	
	}, 400);
});

function getHighestVoteSong() {
	return Songs.findOne({},{sort: {votes: -1}});
}
