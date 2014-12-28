Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() { return Meteor.subscribe('songs');}
});

//PlaylistController = RouteController.extend({
//	template: 'playlist'
//});

Router.route('/', {name: 'playlist'});

Router.route('/songs/:_id', {
	name: 'songPage',
	data: function() { return Songs.findOne(this.params._id); }
});
