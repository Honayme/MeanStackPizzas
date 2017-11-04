var myApp = angular.module('myApp', [
    'ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'homeController'});
        $routeProvider.otherhwise({redirectTo: '/home'});
        
        $locationProvider.html5Mode({enabled: true, requireBase: false});
    }])