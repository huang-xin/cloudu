var $ = function(id){
	return document.getElementById(id);
}

window.addEventListener("load", function(){

	var onsuccess = function(data){
		console.log("success", data);
	}

	var onfail = function(data){
		console.log("fail", data);
	}

	var id = "hz3u8mi6"
	cloudu.device.init(id, "listen", onsuccess, onfail);
	cloudu.device.init(id, "on", onsuccess, onfail);
	cloudu.device.init(id, "off", onsuccess, onfail);

	$("listen").onclick = function(){
		cloudu.listen({
		    id : "hz3u8mi6"
		});
	}

	$("open").onclick = function(){
		cloudu.on({
		    id : "hz3u8mi6"
		});
	}

	$("close").onclick = function(){
		cloudu.off({
		    id : "hz3u8mi6"
		});
	}
	
}, false);