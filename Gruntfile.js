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
						'public/js/konami.js',
						'public//js/backbone/models/gameItem.js',
						'public//js/backbone/collections/gamePlays.js',
						'public//js/backbone/routers/main.js',
						'public//js/backbone/views/inputForm.js',
						'public//js/backbone/views/plays.js',
						'public//js/backbone/views/orderFilter.js'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bb-generate');

	grunt.registerTask('default',['uglify']);
};
