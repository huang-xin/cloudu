var net = require("net");
var options;

var mode = "local";

if(mode === 'bae'){
	options = {
		port : 18088,
		host : '180.149.144.13:30081'
	}
}else{
	options = {
		port : 18088,
		host : '172.21.204.37' //'172.21.204.62'
	}
}

var lights = {
	'hz3u8mi6' : {
		id : 'hz3u8mi6',
		on : 0			//0代表关, 1代表开
	},
	'lbaezlsl' : {
		id : 'lbaezlsl',
		on : 0			//0代表关, 1代表开
	},
	'mx0xvsoa' : {
		id : 'mx0xvsoa',
		on : 0			//0代表关, 1代表开
	}
};

var client = net.connect(options, function(){

	client.puts = function(data){
		client.write(data + "!!!");
	};

	var reg1 = {
		action : "reg",
		id : 'hz3u8mi6',
		info : {
			on : lights['hz3u8mi6'].on
		}
	};

	var reg2 = {
		action : "reg",
		id : 'lbaezlsl',
		info : {
			on : lights['lbaezlsl'].on
		}
	}

	var reg3 = {
		action : "reg",
		id : 'mx0xvsoa',
		info : {
			on : lights['mx0xvsoa'].on
		}
	}
	client.setNoDelay(true);
	client.puts(JSON.stringify(reg1));
	client.puts(JSON.stringify(reg2));
	client.puts(JSON.stringify(reg3));
});

client.on('data', function(data) {
	
	data = data.toString().slice(0,-3);

	data.split("!!!").forEach(function(item){

		item = JSON.parse(item);
		var action = item.cmd;
		var id = item.id;
		var uucode = item.uucode;
		var diff = false;
		if(action == "listen"){
			console.log(id, "listen");
		}else if(action == "on"){
			lights[id].on = 1;
			diff = true;
			console.log(id, "turned on")
		}else if(action == "off"){
			lights[id].on = 0;
			console.log(id, "turned off")
			diff = true;
		}else if(action == "set"){
			if(lights[id].on !== item.info.on){//如果改变了状态
				diff = true;
			}
			lights[id].on = item.info.on;
			console.log(id, "set light to", item.info.on)
		}else if(action == "get"){
			console.log(id, "get light info", lights[id].on);
		}

		var ret = {
			id : id,
			uucode : uucode,
			action : "push",
			success : true,
			diff : diff,
			info : {
				on : lights[id].on
			}
		}

		client.setNoDelay(true);
		client.puts(JSON.stringify(ret));

	});
});

client.on("end", function(){

});