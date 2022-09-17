<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$text = $_POST["text"];
$images = $_POST["images"];
$imagesArr = explode(" ", $images);
$images_to_save = "";
$today = date("Y-m-d");

define('UPLOAD_DIR', 'images/');
foreach($imagesArr as $image){
	$img = $image;
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . uniqid() . '.png';
    $images_to_save .= "../../../xampp/htdocs//twitter-clone/api/".$file ." ";
	$success = file_put_contents($file, $data);
}

$query = $mysqli->prepare("INSERT INTO tweets(date, text, images, user_id) VALUE (?, ?, ?, ?)");
$query->bind_param("sssi", $today, $text, $images_to_save, $userId);
$query->execute();

echo json_encode("yes");
?>