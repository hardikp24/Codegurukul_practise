module.exports = function(grunt) {
//project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		watch:{
			sass:{
				files:['server/srs/*.scss'],
				tasks: 'sass'
			},
		},





		sass: {
			dist: {
				options: {

					style: 'expanded',
					sourcemap: 'auto',

				},
				files: {
					'public/css/main.css' : 'server/srs/main.scss',
				}
			}

		},

	});

//load npm tasks
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
//default task
grunt.registerTask('default', ['sass','watch']);


}