function(doc){
    log('hi');
    var passed = doc.results.total - doc.results.failed;
    var percent = Math.round(( passed / doc.results.total ) * 100 * 100) / 100;
    var ratio = passed + "/" + doc.results.total;
    var score =  percent + "% (" + ratio + ")"; 

    emit(doc.timestamp, {

        "name": doc.name,
        "timestamp":doc.sha,
        "version":doc.version,
        "platform":doc.platform,
        "model":doc.model,
        "fails":doc.results.failures,
        "score": score,

    });
}