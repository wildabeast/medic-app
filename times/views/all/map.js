function(doc) {
	emit(doc._id, {
		'duration': doc.duration,
		'time': doc.time,
		'platform': doc.platform
	});
}