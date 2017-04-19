
var mainApp = angular.module("mainApp", ['ngRoute']);

var username = null;

var erase = false;

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

	when('/play', {
		templateUrl: 'play.html',
		controller: 'playCtrl'
	}).

	when('/review', {
		templateUrl: 'review.html',
		controller: 'reviewCtrl'
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

/* DRAWING DIRECTIVE */

mainApp.directive("drawing", function(){
  return {
    restrict: "A",
    link: function($scope, element){
      var ctx = element[0].getContext('2d');

      // variable that decides if something should be drawn on mousemove
      var drawing = false;

      // the last coordinates before the current move
      var lastX;
      var lastY;

			$scope.setPNGData = function(){
				$scope.turn_info.png_data = element[0].toDataURL();
			};

			$scope.setPNGData();

			$scope.erase_all = function(){
				ctx.rect(0,0,600,600);
				ctx.fillStyle = "white";
				ctx.fill();
			};

			$scope.eraser = function(){
				ctx.lineWidth = 15;
				ctx.strokeStyle = "#ffffff";
				ctx.lineCap = 'round';
			};

			$scope.pencil = function(){
				ctx.lineWidth = 5;
				//ctx.strokeStyle = "#000000";
				ctx.lineCap = 'round';
			};

			$scope.marker = function(){
				ctx.lineWidth = 10;
				//ctx.strokeStyle = "#000000";
				ctx.lineCap = "round";
			};

			$scope.color = function(color){
				switch(color){
					case 'red':
						ctx.strokeStyle = '#FF0000';
						break;
					case 'yellow':
						ctx.strokeStyle = '#FFFF00';
						break;
					case 'black':
						ctx.strokeStyle = '#000000';
						break;
					case 'blue':
						ctx.strokeStyle = '#0000FF';
						break;
				}
			};

			$scope.pencil();
			$scope.erase_all();
			$scope.color('black');

      element.bind('mousedown', function(event){
				

        if(event.offsetX!==undefined){
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else { // Firefox compatibility
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }
        console.log("(" + lastX + ", " + lastY + ")");
        // begins new line
        ctx.beginPath();

        drawing = true;
      });

      element.bind('mousemove', function(event){
        if(drawing){
          // get current mouse position
          if(event.offsetX!==undefined){
            currentX = event.offsetX;
            currentY = event.offsetY;
          } else {
            currentX = event.layerX - event.currentTarget.offsetLeft;
            currentY = event.layerY - event.currentTarget.offsetTop;
          }

          draw(lastX, lastY, currentX, currentY);

          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;

					if($scope.turn_info.time_left == 0)
						$scope.setPNGData();
        }
      });

      element.bind('mouseup', function(event){
        // stop drawing
        drawing = false;
				$scope.setPNGData();
      });

      function draw(lX, lY, cX, cY){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // draw it
        ctx.stroke();
      }
    }
  };
});
