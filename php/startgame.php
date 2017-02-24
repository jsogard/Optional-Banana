<?php

$post = json_decode(file_get_contents("php://input"));
$username = $post->username;

function getCode(){
	$chars = '7894561230QWERTYUIOPASDFGHJKLZXCVBNM';
	return $chars[rand(0,35)] . $chars[rand(0,35)] . $chars[rand(0,35)] . $chars[rand(0,35)];
}

/* FOR JSON DATA MANIPULATION */

$filecontents = file_get_contents('./../data/games.json');
$jsondata = json_decode($filecontents);

$code = getCode();
$valid = false;
while(!$valid){
	$valid = true;
	foreach ($jsondata as $index => $game) {
		if($game->code == $code){
			$code = getCode();
			$valid = false;
			break;
		}
	}
}

array_push($jsondata, ["code" => $code, "open" => 1, "users" => [$username]]);

$jsondata = json_encode($jsondata);
file_put_contents('./../data/games.json', $jsondata);

echo $code;

?>