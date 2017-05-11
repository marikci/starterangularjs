(function () {
    angular.module("main").controller("homeCtrl", homeCtrl);

    homeCtrl.$inject = ["$scope","$global"];
    function homeCtrl($scope,$global) {
        $scope.module = "home module";
    }
})();