
mainApp.controller('reviewCtrl', function($scope,$http,$location,$interval,Data) {

$scope.data = [];
/*
each chain is of this form:
[
  {type:'caption',data:'init_caption',owner:null},
  {type:'image',data:'filepath',owner:'xX_artist420_Xx'},
  ...
]
*/

$scope.game_info = Data.getGameData();

$scope.player_info = Data.getPlayerData();

var initialize = function(){
  $scope.game_info.code = "DBG1"; // REMOVE. FOR TESTING ONLY
  get_all_chains();
}

// retrieves all chains of game from php and stores them
var get_all_chains = function(){
  var game_code = $scope.game_info.code;
  $http({
    method: 'POST',
    url: './php/get_all_chains.php',
    data: {
      game_code:game_code
    },
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).
    success(function(response) {
      console.log(response);
      $scope.data = angular.fromJson(response);
      console.log($scope.data);
    }).
    error(function(response) {
      console.log(response);
    });
}

initialize();

});
