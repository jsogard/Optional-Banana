
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

/* FACTORY */
mainApp.factory('Data', function(){
	var game_data = {
		code: null,
		num_players: null
	};
	var player_data = {
		name: null,
		game_id: null
	};
	return {
		setGameCode: function(code){
			game_data.code = code;
		},
		setGamePlayerCount: function(num_players){
			game_data.num_players = num_players;
		},
		getGameData: function(){
			return game_data;
		},

		setPlayerName: function(name){
			player_data.name = name;
		},
		setPlayerId: function(game_id){
			player_data.game_id = game_id;
		},
		getPlayerData: function(){
			return player_data;
		}
	};
});
