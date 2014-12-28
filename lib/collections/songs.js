Songs = new Mongo.Collection('songs');

validateSongId = function(youtubeVideoId) {
	var errors = {};
	if(!youtubeVideoId || youtubeVideoId.length !== 11) 
		errors.youtubeVideoId = "Please enter a valid youbube video id";
	return errors;
};

Meteor.methods({
	songInsert: function(youtubeVideoId) {
		check(youtubeVideoId, String)
		var errors = validateSongId(youtubeVideoId);
		console.log(errors);
		if (errors.youtubeVideoId)
			throw new Meteor.Error('invalid-song', errors.youtubeVideoId);

		var songWithSameYoutubeVideoId = Songs.findOne({youtubeVideoId: youtubeVideoId});
		console.log(songWithSameYoutubeVideoId);
		if (songWithSameYoutubeVideoId) 
			return {
				SongExists: true,
				_id: songWithSameYoutubeVideoId._id
			}
		
		var song = {
			youtubeVideoId: youtubeVideoId,
			submitted: new Date(),
		};

		var songId = Songs.insert(song);
		console.log(songId);
		return {
			_id: songId._id
		};
	}
});
 

