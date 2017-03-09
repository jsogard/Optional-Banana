
mainApp.controller('playCtrl', function($scope,$http,$location,$interval,Data) {

$scope.turn_info = {
  num: 0,
  mode: 'draw',
  caption: null,
  fpath: null,
  png_data: null,
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

$scope.fuck = "fuck";

$scope.x_test1 = function(){
  console.log('x-test #1 successful');
};

var initialize = function(){

  $http({
    method: 'POST',
    url: './php/init_caption.php',
    data: {},
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).
    success(function(response) {
      $scope.turn_info.caption = response;
      // TODO store initial caption in JSON[game_code][game_id][0]

      //add_turn_data(response);

      $interval(function(){decrement_time()},1000);
    }).
    error(function(response) {
      console.log(response);
    });

};

$scope.getInterval = function(){return $interval;};

// saves the image drawn to the server
// called by save()
var save_image = function(){
  window.open($scope.turn_info.png_data);
  var fpath = getFilePath();
  // TODO: save image on screen to server at fpath
  $http({
    method: 'POST',
    url: './php/save_png.php',
    data: {
      fpath: fpath,
      data:data
    },
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).
    success(function(response) {
      console.log(response);
    }).
    error(function(response) {
      console.log(response);
    });

  add_turn_data(fpath);

  // TODO disable all functionality <<Is this necessary??>>
}

// saves the caption written to the server
// called by save()
var save_caption = function(caption){

  add_turn_data(caption);

  // TODO disable all functionality <<Is this necessary??>>
};

var decrement_time = function(){
  $scope.turn_info.time_left -= 1;
  if($scope.turn_info.time_left < 0){
    next_turn();
  }
};

var next_turn = function(){
  $scope.turn_info.time_left = 30;
  $scope.turn_info.num++;
  if($scope.turn_info.num == $scope.game_info.num_players){
    // TODO end game
  }
  if($scope.turn_info.mode == 'draw'){
    $scope.turn_info.mode = 'caption';
    save_image();
    $scope.turn_info.fpath = get_turn_data();//TODO retrieve last string from play.josn JSON[game_code][chain_no]
  }
  else{
    $scope.turn_info.mode = 'draw';
    save_caption(caption);
    $scope.turn_info.caption = get_turn_data();//TODO retrieve last string from play.josn JSON[game_code][chain_no]
  }
}

// get the index in php of the draw/caption chain
var getChainNumber = function(){
  return ($scope.turn_info.num + $scope.player_info.game_id) % $scope.game_info.num_players;
};

// get the file path to save a drawing as
var getFilePath = function(){

  return './img/'
    + $scope.game_info.code + '_'
    + $scope.turn_info.num + '_'
    + $scope.player_info.game_id + '.png';
};

/* PHP FUNCTIONS */

var add_turn_data = function(data){
  var chain_no = getChainNumber();
  $http({
    method: 'POST',
    url: './php/add_turn_data.php',
    data: {
      game_code:$scope.game_info.code,
      chain_no:chain_no,
      data:data
    },
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).
    success(function(response) {
      console.log(response);
    }).
    error(function(response) {
      console.log(response);
    });
};

var get_turn_data = function(game_mode){
  var chain_no = getChainNumber();
  var data_php = false;
  $http({
    method: 'POST',
    url: './php/get_turn_data.php',
    data: {
      game_code:$scope.game_info.code,
      chain_no:chain_no
    },
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).
    success(function(response) {
      console.log(response);
      switch($scope.turn_info.game_mode){
        case 'caption':
          $scope.turn_info.fpath = response;
          break;
        case 'draw':
          $scope.turn_info.caption = response;
          break;
      }
    }).
    error(function(response) {
      console.log(response);
    });
};

// $scope.debug = function(){
//
// };

initialize();

});
