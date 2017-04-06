<?php
// input: POST -> mode ("incr" | "clr" | "check"), code
// output: na

$post = json_decode(file_get_contents("php://input"));
$code = $post->code;
$mode = $post->mode;

/* JSON IMPLEMENTATION */

$filecontents = file_get_contents('./../data/games.json');
$jsondata = json_decode($filecontents);

foreach ($jsondata as $index => $game) {
	if($game->code == $code){
		if($mode == "incr")
			$game->ready = $game->ready + 1;
		else if($mode == "clr")
			$game->ready = 0;
		else if($mode == "check")
			echo $game->ready;
		break;
	}
}

$jsondata = json_encode($jsondata, JSON_PRETTY_PRINT);
file_put_contents('./../data/games.json', $jsondata);

?>