'use strict';

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  // Project configuration.
  var config = {

    distdir: 'dist',
    builddir: 'build',

    pkg: grunt.file.readJSON('package.json'),

    src: {
      // This will cover all JS files in 'js' and sub-folders
      js: ['src/js/**/*.js'],
      templates: ['src/templates/**/*.html'],
    },

    test: {
      karmaConfig: 'test/config/karma.conf.js',
      unit: ['test/unit/**/*.js']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: {
        src: ['Gruntfile.js', '<%= src.js %>', '<%= test.unit %>']
      }
    },

    karma: {
      // Used in local development
      local: {
        configFile: '<%= test.karmaConfig %>',
      },
      release: {
        configFile: '<%= test.karmaConfig %>',
        singleRun: true,
      }
    },

    ngtemplates: {
      ngPaginatorPlz: {
        src: ['<%= src.templates %>'],
        dest: '<%= builddir %>/ngPaginator_templates.js',
        options: {
          concat: 'dist'
        }
      }
    },

    concat: {
      dist: {
        src: ['<%= src.js %>'],
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      }
    },

    connect: {
      web: {
        options: {
          port: 9000,
          bases: '.',
          keepalive: true
        }
      }
    }
  };

  grunt.initConfig(config);

  // Load plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'karma:local']);
  grunt.registerTask('demo', ['release', 'connect:web']);
  grunt.registerTask('release', ['jshint', 'karma:release', 'ngtemplates', 'concat']);

};