/**
 * ProjectsController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs'),
    path = require("path");

// pipeline = require('../../../../Yesy\ Milano/web/tasks/pipeline');

module.exports = {
    h: function(req, res) {
        res.ok('6666');
    },
    find: function(req, res) {
        var currentDir = __dirname.split(config.companyName)[0] + config.companyName + "/web",
            projects = currentDir.split(config.companyName)[0],
            yesy = projects + "/Yesy Milano" + "/web",
            dirArray = fs.readdirSync(currentDir),
            tree = [],
            n = 0;
        tree.push({
            label: 'web',
            children: []
        });

        fs.readdir(currentDir, function(err, files) {
            if (err) {
                throw err;
            }

            files.map(function(file) {
                    return path.join(currentDir, file);
                })
                // .filter(function(file) {
                //     return fs.statSync(file).isFile();
                // })
                .forEach(function(file) {
                    if (fs.statSync(file).isFile())
                        tree[0].children.push({ label: path.basename(file) });
                    else {
                        var children = fs.readdirSync(currentDir + "/" + path.basename(file));
                        tree[0].children.push({
                            label: path.basename(file),
                            children: ['loading']
                        });

                        n++;
                    }
                });
            res.ok({ tree: tree });
        });
        // {
        //     label: 'Animal',
        //     children: [{
        //         label: 'Dog',
        //         data: {
        //             description: "man's best friend"
        //         }
        //     }, {
        //         label: 'Cat',
        //         data: {
        //             description: "Felis catus"
        //         }
        //     }, {
        //         label: 'Hippopotamus',
        //         data: {
        //             description: "hungry, hungry"
        //         }
        //     }, {
        //         label: 'Chicken',
        //         children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
        //     }]
        // }


        // var walk = function(dir, done) {
        //     var results = [];
        //     results.push({
        //         label: 'web',
        //         children: []
        //     });
        //     fs.readdir(dir, function(err, list) {
        //         if (err) return done(err);
        //         var i = 0;
        //         (function next() {
        //             var file = list[i++];
        //             if (!file) return done(null, results);
        //             file = dir + '/' + file;
        //             fs.stat(file, function(err, stat) {
        //                 if (fs.statSync(file).isFile())
        //                     if (stat && stat.isDirectory()) {
        //                         // var children = fs.readdirSync(currentDir + "/web/" + path.basename(file));
        //                         // results[0].children.push({
        //                         //     label: path.basename(file),
        //                         //     children: children
        //                         // });
        //                         walk(file, function(err, res) {
        //                             results = results.concat(res);
        //                             next();
        //                         });
        //                         next();
        //                     } else {
        //                         // results[0].children.push(path.basename(file));

        //                         results[0].children.push(file);
        //                         next();
        //                     }
        //             });
        //         })();
        //     });
        // };

        // walk(currentDir, function(err, results) {
        //     if (err) throw err;
        //     console.log(results);
        //     res.ok({ tree: results });

        // });
        // for (c in pipeline.jsFilesToConcatProd) {

        // }
        // for (var c = 0; c < pipeline.jsFilesToConcatProd.length; c++) {
        //     fs.readFile(yesy + '/' + pipeline.jsFilesToConcatProd[c], //'/tasks/pipeline.js', 
        //         'utf8',
        //         function(err, data) {
        //             if (err) {
        //                 return console.log(err);
        //             }
        //             res.write(data);
        //             c++;
        //             // console.log(data);
        //         });
        // }
        // res.end();

        // res.ok(pipeline.jsFilesToConcatProd);

        // res.ok(fs.readdirSync(yesy));
        // res.ok();
    },
    findOne: function(req, res) {
        var id = req.params.id;

        if (req.params.id) {

            var currentDir = __dirname.split(config.companyName)[0] + config.companyName + "/web/" + id,
                projects = currentDir.split(config.companyName)[0],
                yesy = projects + "/Yesy Milano" + "/web/" + id;

            try {
                fs.accessSync(currentDir, fs.F_OK);
                var dirArray = fs.readdirSync(currentDir),
                    tree = [];

                return res.ok({ children: fs.readdirSync(currentDir) });

            } catch (e) {
                return res.notFound();
            }

            // Projects.findOne({
            //     id: req.param('id')
            // }, function(err, project) {
            //     if (!project || !err) return res.badRequest();

            //     return res.ok({
            //         profile: project
            //     });
            // });
        } else
            return res.notFound();

        // fs.readdir(currentDir, function(err, files) {
        //     if (err) {
        //         throw err;
        //     }

        //     files.map(function(file) {
        //             return path.join(currentDir, file);
        //         })
        //         // .filter(function(file) {
        //         //     return fs.statSync(file).isFile();
        //         // })
        //         .forEach(function(file) {
        //             if (fs.statSync(file).isFile())
        //                 tree[0].children.push({ label: path.basename(file) });
        //             else {
        //                 var children = fs.readdirSync(currentDir + "/" + path.basename(file));
        //                 tree[0].children.push({
        //                     label: path.basename(file),
        //                     children: ['loading']
        //                 });

        //                 n++;
        //             }
        //         });
        // });
        // res.ok({ tree: tree });
    },
    create: function(req, res) {
        var id = req.params.id;

        if (req.params.id) {
            Projects.create({
                id: req.param('id')
            }, function(err, user) {
                if (!user) return res.badRequest();

                return res.ok({
                    profile: user
                });
            });
        }
    }
};