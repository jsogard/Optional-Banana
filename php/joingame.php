<?php
/*
input: POST -> username, code
output: 
	_001: invalid game code
	_002: game closed
	_003: success
*/

$post = json_decode(file_get_contents("php://input"));
$username = $post->username;
$code = $post->code;

/* JSON IMPLEMENTATION */

$filecontents = file_get_contents('./../data/games.json');
$jsondata = json_decode($filecontents);

foreach ($jsondata as $index => $game) {
	if($game->code == $code){
		if($game->open == 1){
			array_push($game->players, $username);

			$jsondata = json_encode($jsondata);
			file_put_contents('./../data/games.json', $jsondata);
			
			echo '_003';
			exit();	
		}
		echo '_002';
		exit();
	}
}

echo '_001';

?>