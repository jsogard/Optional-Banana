<?php
// input: POST -> code
// output: na

$post = json_decode(file_get_contents("php://input"));
$code = $post->code;

/* JSON IMPLEMENTATION */

$filecontents = file_get_contents('./../data/games.json');
$jsondata = json_decode($filecontents);

foreach ($jsondata as $index => $game) {
	if($game->code == $code){
		$game->open = 0;
		break;
	}
}

$jsondata = json_encode($jsondata);
file_put_contents('./../data/games.json', $jsondata);

?>