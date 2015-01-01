Template.layout.events({
	'click #menu-toggle': function(e, template) {
		e.preventDefault();
		$('#listen-in-wrapper').toggleClass('toggled');
		$('.menu-toggle-button').toggleClass('toggled');
	}
});
