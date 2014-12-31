if( Songs.find().count() === 0) {

	Songs.insert({
		youtubeVideoId: 'ajCYQL8ouqw',
		duration: 7*60,
		title: 'Beatles - Let lt Be',
		voteCount: 6
	});

	Songs.insert({
		youtubeVideoId: 'S09F5MejfBE',
		duration: 3*60 + 55,
		title: 'The Beatles - Yesterday',
		voteCount: 4
	});

	Songs.insert({
		youtubeVideoId: 'DVg2EJvvlF8',
		duration: 2*60 +33,
		title: 'John Lennon - Imagine',
		voteCount: -2
	});

}
