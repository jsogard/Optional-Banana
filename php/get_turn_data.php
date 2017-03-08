<?php
/* input: POST->game_code, chain_no
 * output: last element in play.json [game_code][chain_no]
 * action: none
*/

$post = json_decode(file_get_contents("php://input"));
$code = $post->game_code;
$chain = $post->chain_no;

$json = json_decode(file_get_contents('./../data/play.json'));
$chains = $json->$code;
echo end($chains[$chain]);

 ?>
