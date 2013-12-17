(function(){
	
	var priors =  ['node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js'];
	var norms = ['cloudu/startup.js', 'cloudu/src/interface.js'];
	
	function injectScript(src, callback){
		var script = document.createElement("script");
		script.src = src;
		script.onload = callback || function(){};
		document.head.appendChild(script);
	}
	
	priors.forEach(function(prior){
		prior = "../" + prior;
		injectScript(prior, function(){
			norms.forEach(function(norm){
				norm = "../" + norm;
				injectScript(norm);
			});
		});
	});
	
})();