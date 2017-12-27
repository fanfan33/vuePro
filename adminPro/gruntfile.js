module.exports = function(grunt) {

    grunt.config.init({
    	watch: {
    		lessCssStyle: {
    			files: ['src/css/*.less'],
    			tasks: ['less']
    		},
    		cssMinStyle: {
    			files: ['src/css/*.css', '!src/css/*.min.css'],
    			tasks: ['cssmin']
    		}
    	},
	    clean:{
	        src:"dist/"
	    },
      	useminPrepare: {
          	html: 'home.html',
          	options: {
            	dest: 'dist'
          	}
      	},
        usemin: {
            html: ['dist/home.html']
        },
        uglify: {
            'dist/js/*.min.js': ['src/js/*.js','!src/js/*.min.js']
        },
        copy: {
            html: {
                src: './home.html',
                dest: 'dist/home.html'
            }
        },
        less: {
        	development: {
        		options: {
        			paths: ['src/css']
        		},
        		files: {
        			'src/css/home.css': 'src/css/home.less'
        		}
        	}
        },
        cssmin:{
            'dist/css/app.min.css': ['src/css/home.css']
        }
    });
//  grunt.loadNpmTasks('grunt-contrib-clean');
//  grunt.loadNpmTasks('grunt-contrib-copy');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-concat');
//  
    grunt.loadNpmTasks('grunt-contrib-cssmin');
//  grunt.loadNpmTasks('grunt-usemin');
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
//  grunt.registerTask('default',[
//      'clean',
//      'copy:html',
//      'useminPrepare',
//      'uglify',
//      'cssmin',
//      'usemin'
//  ]);
//	grunt.registerTask('watch', ['watch'])
}