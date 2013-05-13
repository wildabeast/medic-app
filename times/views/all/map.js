function(doc) {
	emit(doc._id, {
		'duration': doc.duration,
		'time': doc.time,
		'platform': doc.platform,
		'ios_duration': doc.platform == 'ios' ? doc.duration : null,
		'android_duration': doc.platform == 'android' ? doc.duration : null
	});
}