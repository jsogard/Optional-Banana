
var mainApp = angular.module("mainApp", ['ngRoute']);

var username = null;

/* ROUTER */
mainApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.

	when('/login', {
		templateUrl: 'login.html',
		controller: 'loginCtrl'
	}).

	when('/join', {
		templateUrl: 'join.html',
		controller: 'joinCtrl'
	}).

	otherwise({
		redirectTo: '/login'
	});
}]);