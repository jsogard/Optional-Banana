<?php
/*
input: POST -> username, code
output:
	_001: invalid game code
	_002: game closed
	_003: success
	_004: user already in game
*/

$post = json_decode(file_get_contents("php://input"));
$username = $post->username;
$code = $post->code;

/* JSON IMPLEMENTATION */

$filecontents = file_get_contents('./../data/games.json');
$jsondata = json_decode($filecontents);

foreach ($jsondata as $index => $game) {

	// check if game exists
	if($game->code == $code){

		// check if user already joined
		if(in_array($username, $game->users)){
			echo '_004';
			exit();
		}

		// check if game is open
		if($game->open == 1){
			array_push($game->users, $username);

			$jsondata = json_encode($jsondata);
			file_put_contents('./../data/games.json', $jsondata);

			echo '_003';
			exit();
		}

		// game is closed
		echo '_002';
		exit();
	}
}

// game does not exist
echo '_001';

?>
