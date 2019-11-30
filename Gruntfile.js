// Gruntfile.js
module.exports = grunt => {
    // Load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt);

    const sass = require('node-sass');
 
    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },

        watch: {
            styles: {
                files: ['**/*.scss'],
                tasks: ['sass'],
                options: {
                spawn: false,
                }
            }
        }

    });
    grunt.registerTask('default', ['sass','watch']);
};