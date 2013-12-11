module.exports = function(grunt) {
	grunt.initConfig({
		bb_generate: {
			options: {
				appname       : "Last plays games by BGG user",
				appsrc        : "public/js/backbone",
				routersrc     : "public/js/backbone/routers/",
				modelsrc      : "public/js/backbone/models/",
				viewsrc       : "public/js/backbone/views/",
				collectionsrc : "public/js/backbone/collections/",
				templatesrc   : "public/js/backbone/templates/"
			},
			router:{},
			view:{},
			collection:{},
			model:{},
			template:{}
		},
		uglify : {
			options : {
				compress:true,
				report:true,
				banner:'/*!<%= grunt.template.date() %> */\n'
			},
			app : {
				files: {
					'public/js/app.min.js' : [
						'public/js/init.js',
						'public/js/main.js',
						'/js/backbone/models/gameItem.js',
						'/js/backbone/collections/gamePlays.js',
						'/js/backbone/routers/main.js',
						'/js/backbone/views/inputForm.js',
						'/js/backbone/views/plays.js',
						'/js/backbone/views/orderFilter.js'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bb-generate');

	grunt.registerTask('default',['uglify']);
};