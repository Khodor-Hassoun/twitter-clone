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
    $query = $mysqli->prepare("DELETE FROM `likes` WHERE user_id = $userId and tweet_id = $tweet");
    $query->execute();
    echo json_encode("removed");
}else{
    $query = $mysqli->prepare("INSERT INTO `likes`(`user_id`, `tweet_id`, `DATE`) VALUE (?, ?, ?)");
    $query->bind_param("iis", $userId, $tweet, $today);
    $query->execute();
    echo json_encode("added");
}
?>