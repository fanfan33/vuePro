module.exports = function(grunt) {

    grunt.config.init({
      clean:{
          src:"dist/"
      },
      useminPrepare: {
          html: 'index.html',
          options: {
            dest: 'dist'
          }
      },
        usemin: {
            html: ['dist/index.html']
        },
        uglify: {
            'dist/js/app.min.js': ['assets/js/*.js']
        },
        copy: {
            html: {
                src: './index.html',
                dest: 'dist/index.html'
            }
        },
        cssmin:{
                'dist/css/app.min.css': ['assets/css/*.css']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask('default',[
        'clean',
        'copy:html',
        'useminPrepare',
        'uglify',
        'cssmin',
        'usemin'
    ]);
}