
mainApp.controller('joinCtrl', function($scope,$http,$location,$interval) {

	var promise = null;

	$scope.start_game = function(){

		// for debugging
		var username = "debug";

		$http({
			method: 'POST',
			url: './php/startgame.php',
			data: {username:username},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	    }).
	    success(function(response) {
	        $scope.lobby.code = response;
			promise = $interval($scope.check_lobby, 500);
	    }).
	    error(function(response) {
	        console.log(response);
	    });

	};

	$scope.join_game = function(code){

		// for debugging
		var username = "debug";

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
					$scope.lobby[code] = code;
					promise = $interval($scope.check_lobby, 500);
					break;
			}
	    }).
	    error(function(response) {
	        console.log(response);
	    });

	};

	$scope.lobby = {
		code: "",
		users: []
	};

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
			if(response.open === 0){
				$interval.cancel(promise);
				console.log('stopping interval');
				// reroute to game
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
	        // reroute to game
	    }).
	    error(function(response) {
	        console.log(response);
	    });

	};

});