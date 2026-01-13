angular.module('kityminderEditor')
    .directive('aboutTab', ['$modal', function($modal) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/aboutTab/aboutTab.html',
            replace: true,
            link: function(scope) {
                scope.openAbout = function() {
                    $modal.open({
                        templateUrl: 'about-dialog.html',
                        controller: function($scope, $modalInstance) {
                            $scope.close = function() {
                                $modalInstance.dismiss('cancel');
                            };
                        },
                        size: 'sm' // small size dialog
                    });
                };
            }
        };
    }]);
