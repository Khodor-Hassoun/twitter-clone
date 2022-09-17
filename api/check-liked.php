<?php
header("Access-Control-Allow-Origin: *");
include("connection.php");

$userId = (int)$_POST["userId"];
$tweet = (int)$_POST["tweet"];
$today = date("Y-m-d");

$query = $mysqli->prepare("SELECT * FROM `likes` WHERE user_id = $userId and tweet_id = $tweet");
$query->execute();
$array = $query->get_result();
$response = $array->fetch_all(MYSQLI_ASSOC);

if(isset($response[0])){
    echo json_encode(1);
}else echo json_encode(0);