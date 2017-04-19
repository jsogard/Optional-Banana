<?php

$username = $_POST['username'];
$password = $_POST['password'];
$sha1 = sha1($password);

/* MADE FOR JSON MANIPULATION */

$filecontents = file_get_contents('./../data/users.json');
$jsondata = json_decode($filecontents);

/* CHECK FOR EXISTING USER */

foreach ($jsondata as $index => $user) {
	if($user->username == $username && $user->sha1 == $sha1){
		echo '_001';
		exit();
	}
}

echo '_002';

?>