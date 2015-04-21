module.exports = function(grunt) {
  grunt.initConfig({
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'version',
              replacement: 'V 0.7b'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['replace/index.html'], dest: '.'},
          {expand: true, flatten: true, src: ['replace/application.hbs'], dest: './templates'}
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*!<%= grunt.template.date() %> */\n',
        mangle: false
      },
      app: {
        files: {
          'public/js/app.min.js': [
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
          templateBasePath: /templates\//,
          templateCompilerPath: 'bower_components/ember/ember-template-compiler.js',
          handlebarsPath: 'bower_components/handlebars/handlebars.js'
        },
        files: {
          "public/js/templates.js": "templates/**/*.hbs"
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
          'js/jquery.min.map': 'jquery/dist/jquery.min.map',

          // Ember + Handlebars
          'js/ember.js': 'ember/ember.debug.js',
          'js/ember-template-compiler.js': 'ember/ember-template-compiler.js',
          'js/handlebars.js': 'handlebars/handlebars.js',
          'js/ember-data.js': 'ember-data/ember-data.js',
          'js/ember-data.js.map': 'ember-data/ember-data.js.map',

          // Konami
          'js/konami.js': 'konami-js/konami.js',

          // Bootstrap
          'css/bootstrap-theme.css': 'bootstrap/dist/css/bootstrap-theme.css',
          'css/bootstrap-theme.css.map': 'bootstrap/dist/css/bootstrap-theme.css.map',
          'css/bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
          'css/bootstrap.css.map': 'bootstrap/dist/css/bootstrap.css.map',
          'fonts': 'bootstrap/dist/fonts/*',
          'js/bootstrap.js': 'bootstrap/dist/js/bootstrap.js',

          // Bootstrap 3 - Modal
          'css/bootstrap-dialog.css': 'bootstrap3-dialog/dist/css/bootstrap-dialog.css',
          'js/bootstrap-dialog.js': 'bootstrap3-dialog/dist/js/bootstrap-dialog.js',

          // Font - Awesome
          'css/font-awesome.css': 'font-awesome/css/font-awesome.css',
          'css/font-awesome.css.map': 'font-awesome/css/font-awesome.css.map',
          'fonts': 'font-awesome/fonts/*',

          // Moment.js
          'js/moment.js': 'moment/moment.js',

          // Chart.js
          'js/Chart.js': 'Chart.js/Chart.js',

          // MetisMenu
          'css/metisMenu.css': 'metisMenu/dist/metisMenu.css',
          'js/metisMenu.js': 'metisMenu/dist/metisMenu.js'
        }
      }
    },
    watch: {
      version: {
        files: ['Gruntfile.js'], // which files to watch
        tasks: ['replace', 'emberTemplates'],
        options: {
          nospawn: true
        }
      },
      styles: {
        files: ['less/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      templates: {
        files: ['templates/**/*.hbs'], // which files to watch
        tasks: ['emberTemplates'],
        options: {
          nospawn: true
        }
      },
      javascript: {
        files: ['js/**/*.js'], // which files to watch
        tasks: ['uglify'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bowercopy');

  grunt.registerTask('default', ['replace', 'less', 'bowercopy', 'emberTemplates', 'uglify']);
};
