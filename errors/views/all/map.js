function(doc) {
	emit(doc._id, {
		sha: doc.sha,
		platform: doc.platform,
		failure: doc.failure,
		details: doc.details,
		version: doc.version,
		model: doc.model
	});
}