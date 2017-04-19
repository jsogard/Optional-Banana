
mainApp.controller('playCtrl', function($scope,$http,$location,$interval,Data) {

var clock_init = 30;
var promise = null;
var test = true;

$scope.pause = false;
$scope.tog_pause = function(){
  $scope.pause = !$scope.pause;
};

$scope.turn_info = {
  num: 0,
  mode: 'draw',
  caption: null,
  fpath: null,
  png_data: null,
  time_left: clock_init
}

$scope.game_info = Data.getGameData();

$scope.player_info = Data.getPlayerData();

$scope.done = function(){
  if($scope.game_info.num_players == 1)
    next_turn();
}

$scope.debug = function(){
  console.log($scope.turn_info);
};

/* FACTORY ACCESSIBLE INFORMATION
game_data = { code, num_players };
player_data = { name, game_id };
*/

/* "PRIVATE" HELPER FUNCTIONS */

// game start logic
var initialize = function(){
  init_caption();
};

// saves the image drawn to the server
// called by save()
var save_image = function(){

  var fpath = '.' + getFilePath();
  var data = $scope.turn_info.png_data;

  save_png(fpath, data);

  add_turn_data(fpath);

}

// saves the caption written to the server
// called by save()
var save_caption = function(caption){

  add_turn_data(caption);

  // TODO disable all functionality <<Is this necessary??>>
};

// decrements the time left and changes turn at 0 seconds
var decrement_time = function(){
  if($scope.pause)
    return;
  $scope.turn_info.time_left -= 1;
  if($scope.turn_info.time_left < 0){
    next_turn();
  }
};

// executes logic required to go to next turn (or end game)
var next_turn = function(){
  $scope.turn_info.time_left = clock_init;
  $scope.turn_info.num++;
  if($scope.game_info.num_players == 1 /*&& $scope.turn_info.num < 4 */){}
  else if($scope.turn_info.num >= $scope.game_info.num_players){
    $location.url('/review');
  }
  if($scope.turn_info.mode == 'draw'){
    $scope.turn_info.caption = '';
    $scope.turn_info.mode = 'caption';
    save_image();
    get_turn_data();
  }
  else{
    $scope.turn_info.mode = 'draw';
    save_caption($scope.turn_info.caption);
    get_turn_data();
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

// TODO check if broken
// saves the new caption/fpath from the turn to the database
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

// TODO check if broken
// sets the fpath/caption for the new turn
var get_turn_data = function(game_mode){
  if($scope.game_info.num_players == 1){
    switch($scope.turn_info.mode){
        case 'caption':
		paths = [
			'TZQ1_15_0.png',
			'TZQ1_25_0.png',
			'TZQ1_17_0.png',
			'TZQ1_13_0.png',
			'TZQ1_21_0.png',
			'TZQ1_7_0.png'
			];
          $scope.turn_info.fpath = './img/' + paths[Math.floor(Math.random() * paths.length) ];
          console.log($scope.turn_info.fpath + "\n fpath <--");
          break;
        case 'draw':
          caps = ['turtle with glasses'
                    ,'angry cheezit'
                    ,'lofti ben'
                    ,'underwater sombrero'
                    ,'so many fish'];
          $scope.turn_info.caption = caps[Math.floor(Math.random() * caps.length)];
          console.log($scope.turn_info.caption);
          break;
        default:
          console.log('problem');
          console.log($scope.turn_info);
      }
      return;
  }
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

// retrieves a random initial caption from database
var init_caption = function(){
  $http({
    method: 'POST',
    url: './php/init_caption.php',
    data: {},
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).
    success(function(response) {
      $scope.turn_info.caption = response;
      // TODO store initial caption in JSON[game_code][game_id][0]

      add_turn_data(response);

      promise = $interval(function(){decrement_time()},1000);
    }).
    error(function(response) {
      console.log(response);
    });
};

// saves png data to the webserver
var save_png = function(fpath, data){
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
};

initialize();

});
