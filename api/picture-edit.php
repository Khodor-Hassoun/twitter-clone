<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
if(isset($_POST["bg"])){
	$bg =1;
	$image= $_POST["bg"];
}else if(isset($_POST["pp"])){
	$pp =1;
	$image = $_POST["pp"];
}

define('UPLOAD_DIR', 'images/');
	$img = $image;
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$file = UPLOAD_DIR . uniqid() . '.png';
    $images_to_save = "../../../xampp/htdocs//twitter-clone/api/".$file;
	$success = file_put_contents($file, $data);

if(isset($bg)){
	$query = $mysqli->prepare("UPDATE `users` SET `profile_background`='$images_to_save' WHERE id ='$userId' ");
	$query->execute();
}else {	
	$query = $mysqli->prepare("UPDATE `users` SET `profile_picture`='$images_to_save' WHERE id ='$userId'");
	$query->execute();
}

echo json_encode($images_to_save);
?>