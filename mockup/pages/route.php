<?php

$page = $_POST['page'];
$error = "404.html";

if(file_exists($page)){
	$page_url = $page;
} else {
	$page_url = $error;
}

echo file_get_contents($page_url);

?>