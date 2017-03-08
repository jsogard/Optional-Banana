<?php
/* input: none
 * output: a random prompt from prompts.json
 * action: none
 */


$json = json_decode(file_get_contents('./../data/prompts.json'));
$len = count($json);
$r = rand(0, $len - 1);
echo $json[$r];

 ?>
