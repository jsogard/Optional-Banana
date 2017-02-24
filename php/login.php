<?php

$username = $_POST['username'];
$password = $_POST['password'];
$md5 = md5($password);

/* MADE FOR JSON MANIPULATION */

$filecontents = file_get_contents('./../data/users.json');
$jsondata = json_decode($filecontents);

/* CHECK FOR EXISTING USER */

foreach ($jsondata as $index => $user) {
	if($user->username == $username && $user->md5 == $md5){
		echo '_001';
		exit();
	}
}

echo '_002';

?>