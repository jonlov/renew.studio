app.controller('ProjectCtrl', ['$scope', function($scope) {
    $scope.folds = [{
        name: 'Beats',
        filter: ''
    }, {
        name: 'My beats',
        filter: 'my-beats'
    }, {
        name: 'Favorites',
        filter: 'favorites'
    }];
}]);

app.controller('ProjectListCtrl', ['$scope', 'projects', '$stateParams', function($scope, projects, $stateParams) {
    $scope.fold = $stateParams.fold;
    projects.all().then(function(projects) {
        $scope.projects = projects;

        $scope.index = function(item) {
            return projects.indexOf(item);
        }
    });
}]);

app.controller('ProjectPreviewCtrl', ['$scope', '$timeout', 'truncate', 'Project', '$sce', '$stateParams',
    function($scope, $timeout, truncate, Project, $sce, $stateParams) {
        var apple_selected, tree, treedata_avm, treedata_geography,
            apply = function(cb) {
                setTimeout(function() {
                    $scope.my_data = treedata_avm;
                    $scope.isInit = true;
                    $scope.$apply('isInit');
                    cb();
                }, 1000)
            };

        $scope.my_tree = tree = {};

        treedata_avm = [];
        $scope.my_data = treedata_avm;

        $scope.doing_async = true;
        $scope.isInit = false;

        Project.get({ id: '' },
            function(projects) {
                treedata_avm = projects.tree;
                apply(function() {
                    $scope.doing_async = false;
                });
            });

        $scope.my_tree_handler = function(branch) {
            var _ref,
                index = branch.label.split('.').length;

            if (index == 2) var label = '/' + branch.label;

            $scope.doing_async = true;

            // if ((_ref = branch.data) != null ? _ref.description : void 0) {
            //     return $scope.output += '(' + branch.data.description + ')';
            // }
            // $scope.my_data = [];
            // $scope.doing_async = true;
            // return $timeout(function() {
            Project.get({ id: label },
                function(projects) {
                    console.log(projects.children)
                    // branch.children = [];
                    // branch.children.push(projects.children);
                    
                    // console.log(branch.children)
                    $scope.doing_async = false;
                    // $scope.my_data = projects.tree;
                    // $scope.doing_async = false;
                    // return tree.expand_all();
                },
                function(err) {
                    $scope.doing_async = false;

                });
            // }, 1000);
        };
        apple_selected = function(branch) {
            return $scope.output = "APPLE! : " + branch.label;
        };
        // treedata_avm = [{
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
        // }, {
        //     label: 'Vegetable',
        //     data: {
        //         definition: "A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.",
        //         data_can_contain_anything: true
        //     },
        //     onSelect: function(branch) {
        //         return $scope.output = "Vegetable: " + branch.data.definition;
        //     },
        //     children: [{
        //         label: 'Oranges'
        //     }, {
        //         label: 'Apples',
        //         children: [{
        //             label: 'Granny Smith',
        //             onSelect: apple_selected
        //         }, {
        //             label: 'Red Delicous',
        //             onSelect: apple_selected
        //         }, {
        //             label: 'Fuji',
        //             onSelect: apple_selected
        //         }]
        //     }]
        // }, {
        //     label: 'Mineral',
        //     children: [{
        //         label: 'Rock',
        //         children: ['Igneous', 'Sedimentary', 'Metamorphic']
        //     }, {
        //         label: 'Metal',
        //         children: ['Aluminum', 'Steel', 'Copper']
        //     }, {
        //         label: 'Plastic',
        //         children: [{
        //             label: 'Thermoplastic',
        //             children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
        //         }, {
        //             label: 'Thermosetting Polymer',
        //             children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
        //         }]
        //     }]
        // }];


        var aceLoaded = function(_editor) {
                var def = '<div class="h-full text-center text-3x" style="overflow: auto;background-image: url(/img/previews/c2.jpg);"> New WEBSITE <br />' + '\n\t\t<div class="h-full text-center text-3x" style="background-image: url(/img/previews/c9.jpg);"> &nbsp I am an <code>HTML</code>string with' + '\n\t\t<a href="#">links!</a> and other <em>stuff</em>' + '\n\t</div>' + '\n</div>';

                _editor.setValue(def);
                // _editor.setOption('wrap', 80);
                $scope.aceSession = _editor.getSession();
            },
            aceChanged = function() {
                $scope.sanitized = $sce.trustAsHtml($scope.aceSession.getDocument().getValue());
            };

        $scope.aceOptions = {
            useWrapMode: true,
            showGutter: true,
            // theme: 'ambian',
            mode: 'html',
            firstLineNumber: 1,
            onLoad: aceLoaded,
            onChange: aceChanged
        }
    }
]);

app.controller('ProjectNewCtrl', ['$scope', function($scope) {
    $scope.project = {
        to: '',
        subject: '',
        content: ''
    }
    $scope.tolist = [{
        name: 'James',
        email: 'james@gmail.com'
    }, {
        name: 'Luoris Kiso',
        email: 'luoris.kiso@hotmail.com'
    }, {
        name: 'Lucy Yokes',
        email: 'lucy.yokes@gmail.com'
    }];
}]);

angular.module('app').directive('labelColor', function() {
    return function(scope, $el, attrs) {
        $el.css({
            'color': attrs.color
        });
    }
});