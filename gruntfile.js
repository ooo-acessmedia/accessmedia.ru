'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var deployServer = 'ftp.texsnab63.ru',
        deployFolder = 'accessmedia.ru',
        liveReloadFolder = 'http://accessmedia.ru/';


    grunt.initConfig({
        'cssmin': {
            target: {
                files: [{
                    expand: true,
                    cwd: 'assets/templates/css',
                    src: ['assets/templates/main.css'],
                    dest: 'assets/templates/main.css',
                    ext: '.css'
                }]
            },
            options: {
                keepSpecialComments: 0
            }
        },

        //cacheBust: {
        //    options: {
        //        encoding: 'utf8',
        //        algorithm: 'md5',
        //        length: 16,
        //        deleteOriginals: true
        //    },
        //    assets: {
        //        files: [{
        //            src: ['assets/templates/css/main.css']
        //        }]
        //    }
        //},

        'less': {
            develop: {
                options: {
                    paths: ["assets/templates"],
                    relativeUrls: true,
                    modifyVars: {
                    }
                },
                files: {
                    "assets/templates/css/main.css" : "assets/templates/less/main.less"
                }
            },

            production: {
                options: {
                    paths: ["assets/templates"],
                    relativeUrls: true,
                    plugins: [
                        (new (require('less-plugin-clean-css'))({
                        }))
                    ],
                    modifyVars: {
                    }
                },
                files: {
                    "assets/templates/css/main.css" : "assets/templates/less/main.less"
                }
            }
        },

        'ftp-deploy': {
            css: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/css/',
                dest: 'domains/' + deployFolder + '/public_html/assets/templates/css/',
                exclusions: ['assets/templates/css/owl.min.less', 'assets/templates/css/fancybox.min.less', 'assets/templates/css/bootstrap.min.less', 'assets/templates/css/boilerplate.min.less']
            },

            js: {
                auth: {
                    host: deployServer,
                    port: 21,
                    authKey: 'key1'
                },
                src: 'assets/templates/js/',
                dest: 'domains/' + deployFolder + '/public_html/assets/templates/js/',
                exclusions: ['jquery.fancybox.min.js', 'jquery-1.12.0.min.js', 'owl.carousel.min.js']

            }

            //img: {
            //    auth: {
            //        host: deployServer,
            //        port: 21,
            //        authKey: 'key1'
            //    },
            //    src: 'assets/templates/img/',
            //    dest: 'domains/'+ deployFolder +'/public_html/assets/templates/img/',
            //    exclusions: ['']
            //
            //}
        },

        uglify: {
            modx: {
                files: {
                    'assets/templates/js/main.min.js': ['assets/templates/js/main.js']
                }
            },

            minishop : {
                files : {
                    'assets/components/minishop2/js/web/default.js' : 'assets/components/minishop2/js/web/default.js'
                }
            }

            //,other: {
            //    files: {
            //        'assets/templates/js/pxgradient.min.js' : ['assets/templates/js/pxgradient.js']
            //    }
            //}
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },

                files: [{
                    expand: true,
                    cwd: 'assets/templates/img',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/templates/img'

                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'ie 10']
            },
            dist: {
                files: {
                    'assets/templates/css/main.css': 'assets/templates/css/main.css'
                }
            }
        },

        watch: {
            css: {
                files: ['assets/templates/less/**/*.less'],
                tasks: ['less:develop', 'autoprefixer', 'ftp-deploy:css'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            },
            js: {
                files: ['assets/templates/js/main.js'],
                tasks: ['ftp-deploy:js'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            },
            //img: {
            //    files: ['assets/templates/img/**/*.{png,jpg,gif}'],
            //    tasks: ['imagemin'],
            //    options: {
            //        spawn: false,
            //        livereload: {
            //            host: liveReloadFolder
            //        }
            //    }
            //},
            "grunt-js" : {
                files: ['gruntfile.js'],
                tasks: ['watch'],
                options: {
                    spawn: false,
                    livereload: {
                        host: liveReloadFolder
                    }
                }
            }
        }
    });


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('production', ['uglify:modx', 'less:production']);
};
