var $ = function(id){
	return document.getElementById(id);
}

$("open").onclick = function(){
	cloudu.on({
	    id : "hz3u8mi6",
	    onsuccess : function(data){console.log(data);},
	    onfail : function(data){console.log(data);}
	});
}

$("close").onclick = function(){
	cloudu.off({
	    id : "hz3u8mi6",
	    onsuccess : function(data){console.log(data);},
	    onfail : function(data){console.log(data);}
	});
}

$("listen").onclick = function(){
	cloudu.listen({
	    id : "hz3u8mi6",
	    onsuccess : function(data){console.log(data);},
	    onfail : function(data){console.log(data);}
	});
}