<?php

$obj = ["one" => 1, "two" => ["a", "b"], "three" => ["tomato" => "red", "orange" => "orange"]];

file_put_contents("./../data/ready.json", json_encode($obj, JSON_PRETTY_PRINT));


?>