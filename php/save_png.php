<?php
// Input: POST -> fpath, data
// Output: none
// Action: save png to fpath

$post = json_decode(file_get_contents("php://input"));
$fpath = $post->fpath;
$data = $post->data;  //data format: "data:image/png;base64,jJSklsKjLFS..."
list(, $data) = explode(',', $data);
$data = base64_decode($data);

file_put_contents($fpath, $data);

 ?>
