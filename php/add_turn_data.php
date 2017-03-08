<?php
/* input: POST->game_code, chain_no, data
 * output: na
 * action: append data to play.json [game_code][chain_no]
*/

$post = json_decode(file_get_contents("php://input"));
$code = $post->game_code;
$chain = $post->chain_no;
$data = $post->data;

$json = json_decode(file_get_contents('./../data/play.json'));
array_push($json->$code->$chain, $data);
file_put_contents('./../data/play.json', json_encode($json));



 ?>
