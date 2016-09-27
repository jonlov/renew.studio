app.controller('SettingsCtrl', ['$scope', '$filter',
    function($scope, $filter) {
        $scope.filter = '';
        $scope.folds = [{
            name: 'Overview',
            filter: 'overview'
        }, {
            name: 'Privacy',
            filter: 'privacy'
        }];

    }
]);

app.controller('SettingsOverviewCtrl', ['$scope', '$filter',
    function($scope, $filter) {
        $scope.editItem = function(item) {
            if (item && item.selected) {
                item.editing = true;
            }
        };

        $scope.doneEditing = function(item) {
            item.editing = false;
        };

    }
]);