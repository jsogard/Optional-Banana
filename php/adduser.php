<?php

$username = $_POST['username'];
$password = $_POST['password'];
$md5 = md5($password);

/* MADE FOR JSON MANIPULATION */

$filecontents = file_get_contents('./../data/users.json');
$jsondata = json_decode($filecontents);

/* CHECK FOR EXISTING USER */

foreach ($jsondata as $index => $user) {
	if($user->username == $username){
		echo '_001';
		exit();
	}
}

/* INSERT USER */

array_push($jsondata, ["md5" => $md5, "username" => $username]);

$jsondata = json_encode($jsondata);
file_put_contents('./../data/users.json', $jsondata);

echo '_002';

?>