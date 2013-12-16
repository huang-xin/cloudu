module.exports = function(grunt) {
	
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        concat: {
            options: {
              separator: '',
              stripBanners: true,
              banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            dist: {
                src: ['node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js', 'cloudu/startup.js', 'cloudu/src/*.js'],
                dest: 'build/cloudu.js',
            },
        }
    });

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);

};
