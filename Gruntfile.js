module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        compress: true,
        report: true,
        banner: '/*!<%= grunt.template.date() %> */\n'
      },
      app: {
        files: {
          'public/js/app.min.js': [
            'js/konami.js',
            'js/ember/**/*.js'
          ]
        }
      }
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "public/css/main.css": "less/base.less" // destination file and source file
        }
      }
    },
    emberTemplates: {
      compile: {
        options: {
          templateBasePath: /public\/templates\//,
          templateCompilerPath: 'bower_components/ember/ember-template-compiler.js',
          handlebarsPath: 'bower_components/handlebars/handlebars.js',
          templateNamespace: 'Handlebars'
        },
        files: {
          "public/js/templates.js": "templates/*.hbs"
        }
      }
    },
    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'public/vendor'
        },
        files: {
          // Jquery
          'js/jquery.js': 'jquery/dist/jquery.min.js',

          // Ember + Handlebars
          'js/ember.js': 'ember/ember.js',
          'js/ember-data.js': 'ember-data/ember-data.js',
          'js/handlebars.js': 'handlebars/handlebars.js',

          // Konami
          'js/konami.js': 'konami-js/konami.js',

          // Spin.js
          'js/spin.js': 'spin.js/spin.js',

          // Bootstrap
          'css/bootstrap-theme.css': 'bootstrap/dist/css/bootstrap-theme.css',
          'css/bootstrap-theme.css.map': 'bootstrap/dist/css/bootstrap-theme.css.map',
          'css/bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
          'css/bootstrap.css.map': 'bootstrap/dist/css/bootstrap.css.map',
          'fonts': 'bootstrap/dist/fonts/*',
          'js/bootstrap.js': 'bootstrap/dist/js/bootstrap.js',

          // Font - Awesome
          'css/font-awesome.css': 'font-awesome/css/font-awesome.css',
          'css/font-awesome.css.map': 'font-awesome/css/font-awesome.css.map',
          'fonts': 'font-awesome/fonts/*'
        }
      }
    },
    watch: {
      styles: {
        files: ['less/*.less', 'templates/*.hbs'], // which files to watch
        tasks: ['less', 'emberTemplates'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bowercopy');

  grunt.registerTask('default', ['less', 'bowercopy', 'emberTemplates', 'uglify']);
};
