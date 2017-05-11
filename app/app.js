var app = angular.module("main", ["ngRoute","oc.lazyLoad"]);

 


app.config(function ($routeProvider, $locationProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        'debug': true,
        'events': true,
        'modules': [{ 
            name: 'homeCtrl',
            files: ['app/modules/home/controller/homeCtrl.js']
        },
        {
            name: 'sampleCtrl',
            files: ['app/modules/sample/controller/sampleCtrl.js']
        },
        {
            name: 'globalFactory',
            files: ['app/factories/globalFactory.js']
        },
        {
            name: 'test',
            files: ['app/modules/home/controller/test.js']
        }]
    });

    $routeProvider
        .when('/', {
            templateUrl: 'app/modules/home/view/home.html',
            controler: "homeCtrl",
            resolve: {
                loadFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["globalFactory", "homeCtrl"]);
                }]
            }
        })
        .when('/sample', {
            templateUrl: 'app/modules/sample/view/sample.html',
            controler: "sampleCtrl",
            resolve: {
                loadFiles: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["sampleCtrl"]);
                }]
            }
        })
        .otherwise({
            redirectTo:"/"
        })
    $locationProvider.hashPrefix('');
})
