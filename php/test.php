<?php

$post = json_decode(file_get_contents("php://input"));


echo $post->data;


?>