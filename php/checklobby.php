<?php
// input: POST -> code
// output: users in JSON array

$post = json_decode(file_get_contents("php://input"));
$code = $post->code;

/* JSON IMPLEMENTATION */

$filecontents = file_get_contents('./../data/games.json');
$jsondata = json_decode($filecontents);

foreach ($jsondata as $index => $game) {
	if($game->code == $code){
		$output = json_encode($game);
		echo $output;
		exit();
	}
}

?>