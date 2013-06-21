function(doc){   
    var passed = null, 
        failures = null, 
        percent = null, 
        ratio = null, 
        score = null; 

    if (doc.results) {  
        passed = doc.results.total - doc.results.failed;    
        percent = Math.round(( passed / doc.results.total ) * 100 * 100) / 100;    
        ratio = passed + "/" + doc.results.total;    
        score =  percent + "% (" + ratio + ")"; 
        failures = doc.results.failures; 
    }    

    emit(doc.plugin_id, {        
        "name": doc.name,        
        "timestamp":doc.sha,        
        "version":doc.version,        
        "platform":doc.platform,        
        "model":doc.model,        
        "fails":failures,        
        "score": score || "n/a",     
        "error": doc.error,        
        "phonegap": doc.phonegap || "2.5.0",        
        "plugin_id": doc.plugin_id || null,        
        "key": doc.plugin_id    
    });
}



