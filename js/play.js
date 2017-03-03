
mainApp.controller('playCtrl', function($scope,$http,$location,$interval,Data) {

$scope.turn_info = {
  num: 0,
  mode: 'draw',
  caption: null,
  fpath: null,
  time_left: 30 // TODO idk how much time to do... if change this change decrement_time()
}

$scope.game_info = Data.getGameData();

$scope.player_info = Data.getPlayerData();

/* FACTORY ACCESSIBLE INFORMATION
game_data = {
  code: null,
  num_players: null
};
player_data = {
  name: null,
  game_id: null
};
*/

var initialize = function(){

  var init_caption = null;
  // TODO retrieve initial caption
  $scope.turn_info.caption = init_caption;

  // TODO store initial caption in JSON[game_code][game_id][0]

  $interval(decrement_time(),1000);
};


// saves the image drawn to the server
// called by save()
var save_image = function(){

  var chain_no = getChainNumber();
  var game_code = $scope.game_info.code;
  // TODO: save image on screen to server at fpath

  /* TODO: send fpath to php to save in play.json
  *  append to JSON[game_code][chain_no]
  */

  // TODO disable all functionality
}

// saves the caption written to the server
// called by save()
var save_caption = function(caption){

  var chain_no = getChainNumber();
  var game_code = $scope.game_info.code;
  // TODO append caption to player.json [game_code][chain_no]

  // TODO disable all functionality
};

var decrement_time = function(){
  $scope.turn_info.time_left -= 1;
  if($scope.turn_info.time_left < 0){

    $scope.turn_info.time_left = 30;
    $scope.turn_info.num++;
    if($scope.turn_info.num == $scope.game_info.num_players){
      // TODO end game
    }
    if($scope.turn_info.mode == 'draw'){
      $scope.turn_info.mode = 'caption';
      save_image();
      $scope.turn_info.fpath = null;//TODO retrieve last string from play.josn JSON[game_code][chain_no]
    }
    else{
      $scope.turn_info.mode = 'draw';
      save_caption(caption);
      $scope.turn_info.caption = null;//TODO retrieve last string from play.josn JSON[game_code][chain_no]
    }

  }
};

// get the index in php of the draw/caption chain
var getChainNumber = function(){
  var num_players = $scope.game_info.num_players;
  var chain_no = turn_no + player_id;
  if(chain_no > num_players)
    chain_no -= num_players;
  return chain_no
};

// get the file path to save a drawing as
var getFilePath = function(){

  return './img/'
    + $scope.game_info.code + '_'
    + $scope.turn_info.num + '_'
    + $scope.player_info.game_id + '.png';
};

initialize();

});
