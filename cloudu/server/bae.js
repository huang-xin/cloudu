var BAE = {}

//BAE version
BAE.version = (function(){
	var version;
	if (process.env && process.env.SERVER_SOFTWARE === 'bae/3.0') {
		version = 3;
	}else if (typeof process.BAE !== 'undefined'){
		version = 2;
	}else{
		version = 0;
	}
	return version;
})();

BAE.port = (function(){
	var PORT;
	if (BAE.version === 2) {
		PORT = process.env.APP_PORT;//bae2.0
	}else if (BAE.version === 3){
		PORT = 18080; //bae3.0
	}else{
		PORT = 8080; //localhost
	}
	return PORT;
})();

BAE.isBAE = (function(){
	return (process.env && process.env.SERVER_SOFTWARE) || typeof process.BAE !== 'undefined';
})();

module.exports = BAE;

