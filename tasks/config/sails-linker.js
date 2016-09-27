/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 *      https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

    grunt.config.set('sails-linker', {
        devJs: {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/**/*.html': [
                    require('../pipeline').jsFilesToInject,
                    require('../pipeline').jsFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    require('../pipeline').jsFilesToInject,
                    require('../pipeline').jsFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    require('../pipeline').jsFilesToInject,
                    require('../pipeline').jsFilesToConcat
                ]
            }
        },

        devJsRelative: {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/**/*.html': [
                    require('../pipeline').jsFilesToInject,
                    require('../pipeline').jsFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    require('../pipeline').jsFilesToInject,
                    require('../pipeline').jsFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    require('../pipeline').jsFilesToInject,
                    require('../pipeline').jsFilesToConcat
                ]
            }
        },

        prodJs: {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/**/*.html': [
                    '.tmp/public/js/production.js',
                    require('../pipeline').jsFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    '.tmp/public/js/production.js',
                    require('../pipeline').jsFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    '.tmp/public/js/production.js',
                    require('../pipeline').jsFilesToInject
                ]
            }
        },

        prodJsRelative: {
            options: {
                startTag: '<!--SCRIPTS-->',
                endTag: '<!--SCRIPTS END-->',
                fileTmpl: '<script src="%s"></script>',
                appRoot: '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/**/*.html': [
                    '.tmp/public/js/production.js',
                    require('../pipeline').jsFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    '.tmp/public/js/production.js',
                    require('../pipeline').jsFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    '.tmp/public/js/production.js',
                    require('../pipeline').jsFilesToInject
                ]
            }
        },

        devStyles: {
            options: {
                startTag: '<!--STYLES-->',
                endTag: '<!--STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s">',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/**/*.html': [
                    require('../pipeline').cssFilesToInject,
                    require('../pipeline').cssFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    require('../pipeline').cssFilesToInject,
                    require('../pipeline').cssFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    require('../pipeline').cssFilesToInject,
                    require('../pipeline').cssFilesToConcat
                ]
            }
        },

        devStylesRelative: {
            options: {
                startTag: '<!--STYLES-->',
                endTag: '<!--STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s">',
                appRoot: '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/**/*.html': [
                    require('../pipeline').cssFilesToInject,
                    require('../pipeline').cssFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    require('../pipeline').cssFilesToInject,
                    require('../pipeline').cssFilesToConcat
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    require('../pipeline').cssFilesToInject,
                    require('../pipeline').cssFilesToConcat
                ]
            }
        },

        prodStyles: {
            options: {
                startTag: '<!--STYLES-->',
                endTag: '<!--STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s">',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/index.html': [
                    '.tmp/public/css/production.css',
                    require('../pipeline').cssFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    '.tmp/public/css/production.css',
                    require('../pipeline').cssFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    '.tmp/public/css/production.css',
                    require('../pipeline').cssFilesToInject
                ]
            }
        },

        prodStylesRelative: {
            options: {
                startTag: '<!--STYLES-->',
                endTag: '<!--STYLES END-->',
                fileTmpl: '<link rel="stylesheet" href="%s">',
                appRoot: '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/index.html': [
                    '.tmp/public/css/production.css',
                    require('../pipeline').cssFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.html': [
                    '.tmp/public/css/production.css',
                    require('../pipeline').cssFilesToInject
                ],
                '.tmp/public/tpl/views/**/*.ejs': [
                    '.tmp/public/css/production.css',
                    require('../pipeline').cssFilesToInject
                ]
            }
        },

        // Bring in JST template object
        devTpl: {
            options: {
                startTag: '<!--TEMPLATES-->',
                endTag: '<!--TEMPLATES END-->',
                fileTmpl: '<script type="text/javascript" src="%s"></script>',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/index.html': ['.tmp/public/jst.js'],
                '.tmp/public/tpl/views/**/*.html': ['.tmp/public/jst.js'],
                '.tmp/public/tpl/views/**/*.ejs': ['.tmp/public/jst.js']
            }
        },

        devJsJade: {
            options: {
                startTag: '// SCRIPTS',
                endTag: '// SCRIPTS END',
                fileTmpl: 'script(src="%s")',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/tpl/views/**/*.jade': require('../pipeline').jsFilesToInject
            }
        },

        devJsRelativeJade: {
            options: {
                startTag: '// SCRIPTS',
                endTag: '// SCRIPTS END',
                fileTmpl: 'script(src="%s")',
                appRoot: '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/tpl/views/**/*.jade': require('../pipeline').jsFilesToInject
            }
        },

        prodJsJade: {
            options: {
                startTag: '// SCRIPTS',
                endTag: '// SCRIPTS END',
                fileTmpl: 'script(src="%s")',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/tpl/views/**/*.jade': ['.tmp/public/js/production.js']
            }
        },

        prodJsRelativeJade: {
            options: {
                startTag: '// SCRIPTS',
                endTag: '// SCRIPTS END',
                fileTmpl: 'script(src="%s")',
                appRoot: '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/tpl/views/**/*.jade': ['.tmp/public/js/production.js']
            }
        },

        devStylesJade: {
            options: {
                startTag: '// STYLES',
                endTag: '// STYLES END',
                fileTmpl: 'link(rel="stylesheet", href="%s")',
                appRoot: '.tmp/public'
            },

            files: {
                '.tmp/public/tpl/views/**/*.jade': require('../pipeline').cssFilesToInject
            }
        },

        devStylesRelativeJade: {
            options: {
                startTag: '// STYLES',
                endTag: '// STYLES END',
                fileTmpl: 'link(rel="stylesheet", href="%s")',
                appRoot: '.tmp/public',
                relative: true
            },

            files: {
                '.tmp/public/tpl/views/**/*.jade': require('../pipeline').cssFilesToInject
            }
        },

        prodStylesJade: {
            options: {
                startTag: '// STYLES',
                endTag: '// STYLES END',
                fileTmpl: 'link(rel="stylesheet", href="%s")',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/tpl/views/**/*.jade': ['.tmp/public/css/production.css']
            }
        },

        prodStylesRelativeJade: {
            options: {
                startTag: '// STYLES',
                endTag: '// STYLES END',
                fileTmpl: 'link(rel="stylesheet", href="%s")',
                appRoot: '.tmp/public',
                relative: true
            },
            files: {
                '.tmp/public/tpl/views/**/*.jade': ['.tmp/public/css/production.css']
            }
        },

        // Bring in JST template object
        devTplJade: {
            options: {
                startTag: '// TEMPLATES',
                endTag: '// TEMPLATES END',
                fileTmpl: 'script(type="text/javascript", src="%s")',
                appRoot: '.tmp/public'
            },
            files: {
                '.tmp/public/tpl/views/**/*.jade': ['.tmp/public/jst.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sails-linker');
};