Router.configure({
	layoutTemplate: 'layout'
});

PlaylistController = RouteController.extend({
	template: 'playlist',
	findOptions: function() {
		return {sort: {votes: -1, _id: -1}}
	},
	subscriptions: function() {
									 console.log(this.findOptions());
		this.songsSub = Meteor.subscribe('songs', this.findOptions());
	},
	songs: function() {
		return Songs.find({}, this.findOptions());
	},
	data: function() {
		return {
			songs: this.songs(),
			ready: this.songsSub.ready
		};
	}
});

Router.route('/', {
	name: 'playlist',
	controller: PlaylistController
});

Router.route('/songs/:_id', {
	name: 'songPage',
	data: function() { return Songs.findOne(this.params._id); }
});
