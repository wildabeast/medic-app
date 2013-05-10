function(doc){
    var passed = doc.results.total - doc.results.failed;
    var percent = Math.round(( passed / doc.results.total ) * 100 * 100) / 100;
    var ratio = passed + "/" + doc.results.total;
    var score =  percent + "% (" + ratio + ")"; 

    emit(doc._id, {

        "name": doc.name,
        "timestamp":doc.sha,
        "score": score,
        "version":doc.version,
        "model":doc.model,
        "fails":doc.results.failures

    }) 
}