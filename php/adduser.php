<?php

$username = $_POST['username'];
$password = $_POST['password'];
$sha1 = sha1($password);

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

array_push($jsondata, ["sha1" => $sha1, "username" => $username]);

$jsondata = json_encode($jsondata, JSON_PRETTY_PRINT);
file_put_contents('./../data/users.json', $jsondata);

echo '_002';

?>