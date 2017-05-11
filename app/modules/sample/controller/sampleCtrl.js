(function () {
    angular.module("main").controller("sampleCtrl", sampleCtrl);

    sampleCtrl.$inject = ["$scope"];
    function sampleCtrl() {
        $scope.module = "sample module";
    }
})();

