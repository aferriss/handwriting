<?php

function post($key){
	if(isset($_POST[$key]))
		return $_POST[$key];
	return false;
}

function getData($url){
	$ch = curl_init();
	$timeout = 30;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

	$data = curl_exec($ch);
	curl_close($ch);

	return $data;
}


$baseUrl = "http://www.cs.toronto.edu/~graves/handwriting.cgi?";

$text = "text=";
$text .= urlencode( post('text') );

$style = "&style=";
$style .= urlencode(post('style') );

$bias = "&bias=";
$bias .= post('bias');

$samples = "&samples=";
$samples .= post('samples');

$baseUrl .= $text . $style . $bias . $samples;

$content = getData($baseUrl);

echo($content);
?>
