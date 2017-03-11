<?php
// Input: POST -> game_code
// Output: JSON encoded chains of game
// Action: none

$post = json_decode(file_get_contents("php://input"));
$code = $post->game_code;

$join_json = json_decode(file_get_contents('./../data/games.json'));
foreach ($join_json as $index => $game) {
  if($game->code == $code){
    $game_join = $game;
    break;
  }
}
$num_players = sizeof($game_join->users);

$play_json = json_decode(file_get_contents('./../data/play.json'));
$chain_data = $play_json->$code;

$out = Array();
foreach ($chain_data as $chain_i => $chain) {
  $out_chain = Array();
  $out_turn = (int)$chain_i;
  foreach ($chain as $turn_i => $turn) {
    // get turn type e.g. caption or image
    if($turn_i % 2 == 0)
      $type = 'caption';
    else
      $type = 'image';
    // get turn owner, null if initial caption
    if($turn_i == 0)
      $owner = null;
    else{
      $index = $chain_i - $turn_i + 1;
      if($index < 0)
        $index += $num_players;
      $owner = $game_join->users[$index];
    }
    // get turn data e.g. caption or filepath
    $data = $turn;
    // create object/dict
    array_push($out_chain,
      Array(
        'type' => $type,
        'data' => $data,
        'owner' => $owner
      ));


  }
  array_push($out,$out_chain);
}

echo json_encode($out);

 ?>
