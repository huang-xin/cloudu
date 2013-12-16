var config = {};
var isBAE = process.env && process.env.SERVER_SOFTWARE === 'bae/3.0';

config.TCPport = 18088;
config.TCPaddr = isBAE ? "180.149.144.13:30081" : "localhost";

module.exports = config;
