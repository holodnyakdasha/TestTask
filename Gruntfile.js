module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
        server: {
          options: {
            port: 8080,
            base: './'
          }
        }
      },
    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {"app/css/main.css": "src/less/main.less"}
      },
      watch: {
        files: "*.less",
        tasks: ["less"]
      }
    },
    watch: {
      styles:{
        options:{
          livereload: true,
          spawn: false,
          event: ['added','deleted','changed']
        },
        files:['**/*.less'],
        tasks:['less']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect:server', 'watch']);
};
