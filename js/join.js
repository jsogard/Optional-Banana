
mainApp.controller('joinCtrl', function($scope,$http,$location,$interval, Data) {

	var promise = null; // for starting/stopping interval function call

	$scope.username = Data.getPlayerData().name;

	// create game
	$scope.start_game = function(){

		var username = $scope.username;

		$http({
			method: 'POST',
			url: './php/startgame.php',
			data: {username:username},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).
	    success(function(response) {
        $scope.lobby.code = response;
				Data.setGameCode(response);
				promise = $interval($scope.check_lobby, 500);
	    }).
	    error(function(response) {
	        console.log(response);
	    });

	    

	};

	// join specified game
	$scope.join_game = function(code){

		if(code == undefined || code.length != 4){
			console.log("Invalid game code.");
			return;
		}

		code = code.toUpperCase();
		var username = $scope.username;

		$http({
			method: 'POST',
			url: './php/joingame.php',
			data: {
				username:username,
				code:code
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).
	    success(function(response) {
	    	switch(response){
					case '_001':
						console.log("Invalid game code.");
						break;
					case '_002':
						console.log("Unable to join game.");
						break;
					case '_003':
						console.log("Game joined!");
						$scope.lobby.code = code;
						Data.setGameCode(code);
						promise = $interval($scope.check_lobby, 500);
						break;
					case '_004':
						console.log('User already in game.');
						if($scope.lobby.code == ""){
							$scope.lobby.code = code;
							Data.setGameCode(code);
							promise = $interval($scope.check_lobby, 500);
						}
						break;
					default:
						console.log(response);
				}
		    }).
		    error(function(response) {
		        console.log(response);
		    });

	};

	$scope.lobby = {
		code: "",
		users: [],
		owner: ""
	};

	// update lobby variable
	$scope.check_lobby = function(){

		var code = $scope.lobby.code;

		$http({
			method: 'POST',
			url: './php/checklobby.php',
			data: {
				code:code
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).
	    success(function(response) {
			$scope.lobby.users = response.users;
			$scope.lobby.owner = $scope.lobby.users[0];
			if(response.open === 0){
				$interval.cancel(promise);
				console.log('stopping interval');
				Data.setGamePlayerCount($scope.lobby.users.length);
				Data.setPlayerId($scope.lobby.users.indexOf($scope.username));
				$location.url('/play');
			}
	    }).
	    error(function(response) {
	        console.log(response);
	    });

	};

	$scope.close_lobby = function(){

		var code = $scope.lobby.code;

		$http({
			method: 'POST',
			url: './php/closelobby.php',
			data: {
				code:code
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).
	    success(function(response) {
				Data.setGamePlayerCount($scope.lobby.users.length);
				Data.setPlayerId($scope.lobby.users.indexOf($scope.username));
        		$location.url('/play');
	    }).
	    error(function(response) {
	        console.log(response);
	    });

	};

	$scope.debug = function(){
		console.log($scope.username);
		console.log(Data.getGameData());
		console.log(Data.getPlayerData());
	};

});
